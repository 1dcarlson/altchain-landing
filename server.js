const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { z } = require('zod');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PostgreSQL database connection
// This uses the existing database connection from your project
let storage;
try {
  storage = require('./server/storage').storage;
} catch (error) {
  console.warn('Storage module not loaded. Database features will be disabled.');
  // Create a mock storage if actual storage can't be loaded
  storage = {
    getWaitlistEntryByEmail: async () => null,
    createWaitlistEntry: async () => ({ id: 1, email: 'test@example.com', createdAt: new Date() })
  };
}

// SendGrid for emails
let sendEmail;
try {
  sendEmail = require('./server/sendgrid').sendEmail;
} catch (error) {
  console.warn('SendGrid module not loaded. Email features will be disabled.');
  // Create a mock sendEmail function if actual one can't be loaded
  sendEmail = async () => true;
}

// Server logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(`[express] ${logLine}`);
    }
  });

  next();
});

// API Routes
// Test endpoint for SendGrid
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
    
    const emailSent = await sendEmail({
      to: testEmail,
      from: fromEmail,
      subject: 'AltChain Email Test',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4c86f9;">Email Test Successful!</h2>
          <p>This is a test email from AltChain to confirm that the SendGrid integration is working correctly.</p>
          <p>Best regards,<br>The AltChain Team</p>
        </div>
      `
    });
    
    if (emailSent) {
      return res.status(200).json({ message: 'Test email sent successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to send test email' });
    }
  } catch (error) {
    console.error('Test email error:', error);
    return res.status(500).json({ message: 'Failed to send test email' });
  }
});

// Waitlist endpoint
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Basic email validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }
    
    // Check if email already exists in waitlist
    const existingEntry = await storage.getWaitlistEntryByEmail(email);
    if (existingEntry) {
      return res.status(200).json({ 
        message: "This email is already on our waitlist" 
      });
    }
    
    // Store the email in the database
    await storage.createWaitlistEntry({ email });
    
    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({ 
        message: "SendGrid API key is not configured" 
      });
    }

    // Set up email parameters
    const fromEmail = process.env.FROM_EMAIL || 'noreply@altchain.com';
    
    // Send confirmation email to the user
    const emailSent = await sendEmail({
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
      // Even if email fails, the user is on the waitlist
      console.warn("Failed to send confirmation email, but user added to waitlist");
    }

    // Send notification to admin
    await sendEmail({
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
    
    return res.status(500).json({ 
      message: "Failed to join waitlist" 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  console.error(err);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'dist' directory
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // All remaining requests return the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[express] serving on port ${PORT}`);
});

module.exports = server; // For testing purposes