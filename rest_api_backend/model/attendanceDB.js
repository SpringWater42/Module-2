import {pool} from '../config/db.js'


const getAttendance = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM attendance ;')
        return row
    } catch (error) {
        return 'err'
    }
}


export {getAttendance , postAttendance}