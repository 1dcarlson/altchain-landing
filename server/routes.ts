import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./sendgrid";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Add waitlist API endpoint
  app.post('/api/waitlist', async (req, res) => {
    try {
      // Validate request body
      const validatedData = waitlistSchema.parse(req.body);
      const { email } = validatedData;
      
      // Get SendGrid API key from environment variables
      const sendgridApiKey = process.env.SENDGRID_API_KEY || '';
      if (!sendgridApiKey) {
        return res.status(500).json({ 
          message: "SendGrid API key is not configured" 
        });
      }

      // Set up email parameters
      const fromEmail = process.env.FROM_EMAIL || 'noreply@altchain.com';
      
      // Send confirmation email to the user
      const emailSent = await sendEmail(sendgridApiKey, {
        to: email,
        from: fromEmail,
        subject: "Welcome to AltChain Waitlist!",
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4c86f9;">Thank you for joining AltChain's waitlist!</h2>
            <p>We're excited to have you on board. You'll be among the first to know when we're ready to launch our AI-powered global sourcing platform.</p>
            <p>In the meantime, if you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br>The AltChain Team</p>
          </div>
        `
      });

      if (!emailSent) {
        return res.status(500).json({ 
          message: "Failed to send confirmation email" 
        });
      }

      // Send notification to admin
      await sendEmail(sendgridApiKey, {
        to: process.env.ADMIN_EMAIL || fromEmail,
        from: fromEmail,
        subject: "New AltChain Waitlist Signup",
        text: `New waitlist signup: ${email}`
      });

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

  const httpServer = createServer(app);
  return httpServer;
}
