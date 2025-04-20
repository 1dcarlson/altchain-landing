import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEmail } from './email';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Redirect non-www to www for consistent domain access and simplified SSL management
app.use((req, res, next) => {
  if (req.headers.host === 'altchain.app') {
    return res.redirect(301, `https://www.altchain.app${req.url}`);
  }
  next();
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required' 
    });
  }

  try {
    await sendEmail({
      to: 'daniel@altchain.app', // Or another address if preferred
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage: ${message}`,
      html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });

    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.error('Failed to send contact form email:', err);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Contact form server listening on port ${PORT}`);
});