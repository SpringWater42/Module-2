import {pool} from '../config/db.js'


const getAttendance = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM leaverequests ;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postAttendance = async (employee_id, name, position, department, salary, employmentHistory, contact) => {
    await pool.query(`INSERT INTO employees (employee_id, name, position_, department, salary, employmentHistory, contact) VALUES (?,?,?,?,?,?,?);`,
    [employee_id, name, position, department, salary, employmentHistory, contact]
    )
}

export {getAttendance , postAttendance}