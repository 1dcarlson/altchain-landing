import sgMail from '@sendgrid/mail';

// Initialize SendGrid with the API key from environment variables
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SendGrid API key not found in environment variables');
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 * @param params Email parameters (to, from, subject, text, html)
 * @returns Promise<boolean> indicating success or failure
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is not set in environment variables');
      return false;
    }
    
    const message = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text ?? '',
      html: params.html ?? ''
    };
    
    await sgMail.send(message);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
