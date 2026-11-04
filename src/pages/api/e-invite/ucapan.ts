import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../../lib/db';

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ucapan (
      id        SERIAL PRIMARY KEY,
      name      TEXT NOT NULL,
      message   TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await ensureTable();

    if (req.method === 'GET') {
      const result = await pool.query(
        'SELECT id, name, message, created_at FROM ucapan ORDER BY created_at DESC'
      );
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { name, message } = req.body ?? {};
      if (!name?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Nama dan ucapan diperlukan.' });
      }
      const result = await pool.query(
        'INSERT INTO ucapan (name, message) VALUES ($1, $2) RETURNING *',
        [name.trim(), message.trim()]
      );
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body ?? {};
      if (!id) return res.status(400).json({ error: 'ID diperlukan.' });
      await pool.query('DELETE FROM ucapan WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[ucapan]', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
}
