import {pool} from '../config/db.js'

const getAttendance = async() => {
    let [row] = await pool.query('SELECT * FROM leaverequests;');
    return row;
}

const postAttendance = async (id , employeeId ,date , reason ,status) => {
    await pool.query(`INSERT INTO leaverequests (id , employeeId ,date , reason ,status) VALUES (?,?,?,?,?);`,
    [id , employeeId , date , reason ,status]
    );
}

const deleteAttendance = async (id) => {
  await pool.query("DELETE FROM leaverequests WHERE id = ?", [id]);
};

export {getAttendance , postAttendance , deleteAttendance} 