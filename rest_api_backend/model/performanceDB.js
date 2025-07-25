import {pool} from '../config/db.js'


const getPerformance = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM performance;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postPerformance = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
    await pool.query(`INSERT INTO employees (employee_id, name, position_, department, salary, employmentHistory, contact) VALUES (?,?,?,?,?,?,?);`,
    [employee_id, name, position, department, salary, employmentHistory, contact]
    )
}

export {getPerformance , postPerformance}