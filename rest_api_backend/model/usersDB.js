import {pool} from '../config/db.js'


const getUser = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM payrolldata;')
        return row
    } catch (error) {
        return error
    }
}

export {getUser}