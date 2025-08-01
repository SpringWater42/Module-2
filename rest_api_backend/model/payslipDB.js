import { pool } from '../config/db.js';

const getPayslip = async () => {
  const [rows] = await pool.query("SELECT * FROM payrolldata");
  return rows;
};

const getPayslipById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM payrolldata WHERE employeeId = ?", [id]);
  return rows[0];
};

const postPayslip = async (employeeId, hoursWorked, leaveDeductions, finalSalary) => {
  await pool.query(
    "INSERT INTO payrolldata (employeeId, hoursWorked, leaveDeductions, finalSalary) VALUES (?, ?, ?, ?)",
    [employeeId, hoursWorked, leaveDeductions, finalSalary]
  );
};

const patchPayslip = async (employeeId, hoursWorked, leaveDeductions, finalSalary) => {
  await pool.query(
    "UPDATE payrolldata SET hoursWorked = ?, leaveDeductions = ?, finalSalary = ? WHERE employeeId = ?",
    [hoursWorked, leaveDeductions, finalSalary, employeeId]
  );
};

const deletePayslip = async (id) => {
  await pool.query("DELETE FROM payrolldata WHERE employeeId = ?", [id]);
};

export {
  getPayslip,
  getPayslipById,
  postPayslip,
  patchPayslip,
  deletePayslip
};
