import {pool} from '../config/db.js'


const getPayslip = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM payrolldata;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postPayslip = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
    await pool.query(`INSERT INTO employees (employee_id, name, position_, department, salary, employmentHistory, contact) VALUES (?,?,?,?,?,?,?);`,
    [employee_id, name, position, department, salary, employmentHistory, contact]
    )
}

export {getPayslip , postPayslip}