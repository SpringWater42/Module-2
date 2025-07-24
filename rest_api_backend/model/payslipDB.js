import {pool} from '../config/db.js'


const getPayslip = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM payrolldata;')
        return row
    } catch (error) {
        return 'err'
    }
}

export {getPayslip}