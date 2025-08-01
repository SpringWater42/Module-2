import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
  async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result.insertId;
  },
  async findByUsername(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
};

export default User;


