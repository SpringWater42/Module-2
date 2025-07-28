// model/payrollDB.js
import { pool } from '../config/db.js';

// Get all payslips
const getPayslip = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM payrolldata;');
    return rows;
  } catch (error) {
    console.error('Error fetching payslips:', error);
    return 'err';
  }
};

// Insert new payslip
const postPayslip = async (employeeId, hoursWorked, leaveDeductions, finalSalary) => {
  await pool.query(
    `INSERT INTO payrolldata (employeeId, hoursWorked, leaveDeductions, finalSalary) VALUES (?, ?, ?, ?);`,
    [employeeId, hoursWorked, leaveDeductions, finalSalary]
  );
};

// Update payslip by employeeId
const patchPayslip = async (employeeId, hoursWorked, leaveDeductions, finalSalary) => {
  try {
    await pool.query(
      `UPDATE payrolldata 
       SET hoursWorked = ?, leaveDeductions = ?, finalSalary = ?
       WHERE employeeId = ?;`,
      [hoursWorked, leaveDeductions, finalSalary, employeeId]
    );
  } catch (error) {
    console.error('Error updating payslip:', error);
    throw error;
  }
};

// Delete payslip by employeeId
const deletePayslip = async (employeeId) => {
  await pool.query(`DELETE FROM payrolldata WHERE employeeId = ?;`, [employeeId]);
};

export { getPayslip, postPayslip, patchPayslip, deletePayslip };
