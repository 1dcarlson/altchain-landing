import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail, sendWaitlistConfirmation, type SupportedLanguage } from "./email";
import { z } from "zod";
import { insertWaitlistSchema } from "@shared/schema";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Redirect route for email links
  app.get('/go-to-site', (req, res) => {
    // Redirect to the actual website
    return res.redirect("https://altchain.app");
  });
  
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
      const { email, name, language } = validatedData;
      
      // Additional validation for name (if provided)
      if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
        return res.status(400).json({ message: 'Name must be at least 2 characters long' });
      }
      
      // Check if email already exists in waitlist
      const existingEntry = await storage.getWaitlistEntryByEmail(email);
      let isExisting = false;
      
      if (existingEntry) {
        // Mark as existing but continue to send welcome email for testing
        console.log(`Duplicate waitlist submission for email: ${email} - sending test email anyway`);
        isExisting = true;
        // For testing purposes, we'll continue to send the email instead of returning early
      } else {
        // Store the email and optional name in the database if it's new
        await storage.createWaitlistEntry({ email, name });
      }
      
      // Check if SendGrid is configured
      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ 
          message: "SendGrid API key is not configured" 
        });
      }

      // Set up email parameters
      const fromEmail = process.env.FROM_EMAIL || 'Daniel from AltChain <daniel@altchain.app>';
      
      // Send confirmation email to the user in their preferred language
      try {
        // Use the user's selected language or fall back to English
        // Validate the language is one of our supported ones
        const supportedLanguages = ['en', 'es', 'fr', 'zh', 'ru'] as const;
        type SupportedLanguage = typeof supportedLanguages[number];
        
        // Check if language is supported, default to 'en' if not
        const userLanguage = (language && supportedLanguages.includes(language as SupportedLanguage)) 
          ? (language as SupportedLanguage) 
          : 'en';
        
        // Log which language we're using for the email
        console.log(`Sending waitlist confirmation email in ${userLanguage} language`);
        
        // Use the multilingual email function with the user's language and name
        await sendWaitlistConfirmation(email, userLanguage, name || '');
        
        // Additional personalized line for name if provided
        if (name) {
          console.log(`Email sent to ${name} at ${email}`);
        }
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
          html: `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
              <div style="display: flex; align-items: center; margin-bottom: 24px;">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
                  <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
              </div>
              
              <h2 style="color: #4c86f9; font-size: 20px; margin-bottom: 12px;">New Waitlist Signup</h2>
              
              <div style="padding: 15px; border-left: 4px solid #4c86f9; background-color: #f9fafb; margin-bottom: 20px;">
                <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0;">
                  <strong>Email:</strong> ${email}<br>
                  ${name ? `<strong>Name:</strong> ${name}` : ''}
                </p>
              </div>
            </div>
          `
        });
      } catch (notifyError) {
        console.warn("Failed to send admin notification:", notifyError);
      }

      // Return success response
      return res.status(200).json({ 
        message: isExisting ? "Test email sent to existing address" : "Successfully joined the waitlist",
        isExisting
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
                <path d="M16 2.66667L29.3333 16L16 29.3333L2.66667 16L16 2.66667Z" fill="#1E3A8A" fill-opacity="0.1" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 11.3333L25.3333 16L22 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 11.3333L6.66667 16L10 20.6667" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.6667 22L17.3333 10" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h1 style="font-size: 24px; color: #1a1a1a; margin: 0; font-weight: bold;">AltChain</h1>
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
