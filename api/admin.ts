import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // You can add logic here later if needed
  res.status(200).json({ message: 'Admin route active' });
}
