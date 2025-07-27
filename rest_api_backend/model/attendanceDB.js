import {pool} from '../config/db.js'


const getAttendance = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM leaverequests ;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postAttendance = async (id , employeeId ,date , reason ,status) => {
    await pool.query(`INSERT INTO leaverequests (id , employeeId ,date , reason ,status) VALUES (?,?,?,?,?);`,
    [id , employeeId , date , reason ,status]
    )
}

export {getAttendance , postAttendance}