import {pool} from '../config/db.js'


const getPerformance = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM performance;')
        return row
    } catch (error) {
        return 'err'
    }
}

export {getPerformance , postPerformace}