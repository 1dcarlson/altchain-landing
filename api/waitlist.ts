import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, language } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required and must be a string' });
  }

  try {
    await sql`
      INSERT INTO waitlist (email, name, language)
      VALUES (${email}, ${name || null}, ${language || null})
    `;
    return res.status(200).json({ success: true });
  } catch (error) {
  console.error('Error inserting into waitlist:', error);
  return res.status(500).json({
    error: `Database error: ${error instanceof Error ? error.message : String(error)}`,
  });
}
