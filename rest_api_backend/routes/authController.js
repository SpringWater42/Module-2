import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { db } from '../config/db.js';

config(); // Always at the top

export async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user.length) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    await pool.query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user[0].id, token, expiresAt]
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // this must be your **app password**
      },
    });

    const mailOptions = {
      from: `"Modern Tech" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Link',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password:</p>
        <a href="http://localhost:5173/reset-password?token=${token}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Check your email for a reset link' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};
