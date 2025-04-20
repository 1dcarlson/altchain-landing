import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./email";
import { z } from "zod";
import { insertWaitlistSchema } from "@shared/schema";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple favicon serving with explicit MIME type for Safari
  app.get('/favicon.ico', (req, res) => {
    res.set('Content-Type', 'image/x-icon');
    res.sendFile(path.resolve('./public/favicon.ico'));
  });
  
  // Apple touch icon variations with explicit MIME type for Safari
  const appleIconVariations = [
    '/apple-touch-icon.png',
    '/apple-touch-icon-precomposed.png',
    '/apple-touch-icon-57x57.png',
    '/apple-touch-icon-57x57-precomposed.png',
    '/apple-touch-icon-72x72.png',
    '/apple-touch-icon-72x72-precomposed.png',
    '/apple-touch-icon-114x114.png',
    '/apple-touch-icon-114x114-precomposed.png',
    '/apple-touch-icon-144x144.png',
    '/apple-touch-icon-144x144-precomposed.png'
  ];
  
  appleIconVariations.forEach(iconPath => {
    app.get(iconPath, (req, res) => {
      res.set('Content-Type', 'image/png');
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.sendFile(path.resolve(`./public${iconPath}`));
    });
  });
  // Test endpoint for SendGrid (remove in production)
  app.get('/api/test-email', async (req, res) => {
    try {
      const testEmail = req.query.email;
      
      if (!testEmail || typeof testEmail !== 'string') {
        return res.status(400).json({ message: 'Email query parameter is required' });
      }
      
      // Check if SendGrid is configured
      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ message: 'SendGrid API key is not configured' });
      }
      
      const fromEmail = process.env.FROM_EMAIL || 'noreply@altchain.com';
      
      try {
        await sendEmail({
          to: testEmail,
          subject: 'AltChain Email Test',
          text: 'This is a test email from AltChain to confirm that the SendGrid integration is working correctly.',
          html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4c86f9;">Email Test Successful!</h2>
              <p>This is a test email from AltChain to confirm that the SendGrid integration is working correctly.</p>
              <p>Best regards,<br>The AltChain Team</p>
            </div>
          `
        });
        
        return res.status(200).json({ message: 'Test email sent successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Failed to send test email' });
      }
    } catch (error) {
      console.error('Test email error:', error);
      return res.status(500).json({ message: 'Failed to send test email' });
    }
  });

  // Add waitlist API endpoint
  app.post('/api/waitlist', async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistSchema.parse(req.body);
      const { email, name } = validatedData;
      
      // Additional validation for name (if provided)
      if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
        return res.status(400).json({ message: 'Name must be at least 2 characters long' });
      }
      
      // Check if email already exists in waitlist
      const existingEntry = await storage.getWaitlistEntryByEmail(email);
      if (existingEntry) {
        return res.status(200).json({ 
          message: "This email is already on our waitlist" 
        });
      }
      
      // Store the email and optional name in the database
      await storage.createWaitlistEntry({ email, name });
      
      // Check if SendGrid is configured
      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ 
          message: "SendGrid API key is not configured" 
        });
      }

      // Set up email parameters
      const fromEmail = process.env.FROM_EMAIL || 'noreply@altchain.com';
      
      // Send confirmation email to the user
      try {
        const htmlContent = `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
            <div style="display: flex; align-items: center; margin-bottom: 24px;">
              <img src="https://altchain.app/favicon.ico" alt="AltChain Logo" width="32" height="32" style="margin-right: 10px; border-radius: 4px;">
              <h1 style="font-size: 24px; color: #1a1a1a; margin: 0;">AltChain</h1>
            </div>
          
            <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">
              ${name ? `Hi ${name}, thank you for joining AltChain's waitlist!` : 'Thank you for joining AltChain\'s waitlist!'}
            </h2>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We're excited to have you on board. You'll be among the first to know when we're ready to launch our AI-powered global sourcing platform.
            </p>
          
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              In the meantime, if you have any questions, feel free to reply to this email.
            </p>
          
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Best regards,<br>
              <strong>The AltChain Team</strong>
            </p>
          </div>
        `;
        
        await sendEmail({
          to: email,
          subject: `Welcome to AltChain${name ? `, ${name}` : ''}!`,
          text: `Hi ${name ? name : 'there'}, thanks for joining AltChain! You're officially on our waitlist and will be among the first to access our platform when we launch.`,
          html: htmlContent
        });
      } catch (emailError) {
        // Even if email fails, the user is on the waitlist
        console.warn("Failed to send confirmation email, but user added to waitlist:", emailError);
      }

      // Send notification to admin
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'daniel@altchain.app',
          subject: "New AltChain Waitlist Signup",
          text: `New waitlist signup: ${email}${name ? ` (${name})` : ''}`,
          html: `<p>New waitlist signup: <strong>${email}</strong>${name ? ` - ${name}` : ''}</p>`
        });
      } catch (notifyError) {
        console.warn("Failed to send admin notification:", notifyError);
      }

      // Return success response
      return res.status(200).json({ 
        message: "Successfully joined the waitlist" 
      });
    } catch (error) {
      console.error("Waitlist submission error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email address", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        message: "Failed to join waitlist" 
      });
    }
  });

  // Add contact form API endpoint
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      await sendEmail({
        to: 'daniel@altchain.app',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
            <div style="display: flex; align-items: center; margin-bottom: 24px;">
              <img src="https://altchain.app/favicon.ico" alt="AltChain Logo" width="32" height="32" style="margin-right: 10px; border-radius: 4px;">
              <h1 style="font-size: 24px; color: #1a1a1a; margin: 0;">AltChain</h1>
            </div>
            
            <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">New Contact Message</h2>
            
            <div style="padding: 15px; border-left: 4px solid #4c86f9; background-color: #f9fafb; margin-bottom: 20px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0;">
                <strong>From:</strong> ${name}<br>
                <strong>Email:</strong> ${email}
              </p>
            </div>
            
            <div style="margin-top: 16px;">
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 8px;"><strong>Message:</strong></p>
              <p style="font-size: 16px; color: #333; line-height: 1.6; padding: 16px; background-color: #f9fafb; border-radius: 6px;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
          </div>
        `
      });
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
