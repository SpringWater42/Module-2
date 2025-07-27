import {pool} from '../config/db.js'


const getPerformance = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM performance;')
        return row
    } catch (error) {
        return 'err'
    }
}

const postPerformance = async ( id ,employeeId, rating, description, review_month) => {
    await pool.query(`INSERT INTO performance ( id ,employeeId, rating, description, review_month) VALUES (?,?,?,?,?);`,
    [ id ,employeeId, rating, description, review_month]
    )
}

export {getPerformance , postPerformance}