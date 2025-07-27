import {pool} from '../config/db.js'


const getPayslip = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM payrolldata;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postPayslip = async (id , employeeId , hoursWorked , leaveDeductions , finalSalary) => {
    await pool.query(`INSERT INTO payrolldata (id , employeeId , hoursWorked , leaveDeductions , finalSalary) VALUES (?,?,?,?,?);`,
    [id , employeeId , hoursWorked , leaveDeductions , finalSalary]
    )
}

export {getPayslip , postPayslip}