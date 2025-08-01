import { pool } from '../config/db.js';

const getPerformance = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM performance;');
    return rows;
  } catch (error) {
    console.error('DB error getting performance:', error);
    throw error;
  }
};

const postPerformance = async (employeeId, rating, description, review_month) => {
  try {
    const sql = `INSERT INTO performance (employeeId, rating, description, review_month) VALUES (?, ?, ?, ?)`;
    await pool.query(sql, [employeeId, rating, description, review_month]);
  } catch (error) {
    console.error('DB error posting performance:', error);
    throw error;
  }
};

const updatePerformance = async (id, employeeId, rating, description, review_month) => {
  try {
    const sql = `
      UPDATE performance 
      SET employeeId = ?, rating = ?, description = ?, review_month = ? 
      WHERE id = ?
    `;
    await pool.query(sql, [employeeId, rating, description, review_month, id]);
  } catch (error) {
    console.error('DB error updating performance:', error);
    throw error;
  }
};

const deletePerformance = async (id) => {
  try {
    await pool.query('DELETE FROM performance WHERE id = ?', [id]);
  } catch (error) {
    console.error('DB error deleting performance:', error);
    throw error;
  }
};

export { getPerformance, postPerformance, updatePerformance, deletePerformance };
