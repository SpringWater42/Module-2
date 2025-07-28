import {pool} from '../config/db.js'


const getEmployees = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM employees;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postEmployees = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
    await pool.query(`INSERT INTO employees (employee_id, name, position_, department, salary, employmentHistory, contact) VALUES (?,?,?,?,?,?,?);`,
    [employee_id, name, position, department, salary, employmentHistory, contact]
    )
}

const patchEmployees = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
  try {
    console.log('Updating employee:', { employee_id, name, position, department, salary, employmentHistory, contact });

    await pool.query(
      `UPDATE employees 
       SET name = ?, position_ = ?, department = ?, salary = ?, employmentHistory = ?, contact = ?
       WHERE employee_id = ?;`,
      [name, position, department, salary, employmentHistory, contact, employee_id]
    );

    console.log('Update successful');
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// model/employeeDB.js
const deleteEmployees = async (employee_id) => {
  await pool.query("DELETE FROM employees WHERE employee_id = ?", [employee_id]);
};


export {getEmployees , postEmployees , patchEmployees , deleteEmployees}