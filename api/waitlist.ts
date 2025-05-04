import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, language } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required and must be a string' });
    }

    console.log('🚀 Inserting into waitlist:', { email, name, language });

    await sql`
      INSERT INTO waitlist (email, name, language)
      VALUES (${email}, ${name || null}, ${language || null});
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Waitlist error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
