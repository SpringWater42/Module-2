import { pool } from '../config/db.js';

// Get all employees
const getEmployees = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees;');
    return rows;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return 'err';
  }
};

// Add a new employee
const postEmployees = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
  await pool.query(
    `INSERT INTO employees (employee_id, name, position_, department, salary, employmentHistory, contact) 
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [employee_id, name, position, department, salary, employmentHistory, contact]
  );
};

// Partially update an employee
const patchEmployees = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
  try {
    await pool.query(
      `UPDATE employees 
       SET name = ?, position_ = ?, department = ?, salary = ?, employmentHistory = ?, contact = ?
       WHERE employee_id = ?;`,
      [name, position, department, salary, employmentHistory, contact, employee_id]
    );
  } catch (error) {
    console.error('Error updating employee (PATCH):', error);
    throw error;
  }
};

// Fully update an employee
const updateEmployees = async (id, data) => {
  const {
    name,
    position,
    department,
    salary,
    employmentHistory,
    contact
  } = data;

  await pool.query(
    `UPDATE employees SET 
      name = ?, 
      position_ = ?, 
      department = ?, 
      salary = ?, 
      employmentHistory = ?, 
      contact = ?
     WHERE employee_id = ?`,
    [name, position, department, salary, employmentHistory, contact, id]
  );
};

// Delete an employee
const deleteEmployees = async (employee_id) => {
  await pool.query("DELETE FROM employees WHERE employee_id = ?", [employee_id]);
};

export {
  getEmployees,
  postEmployees,
  patchEmployees,
  updateEmployees,
  deleteEmployees
};
