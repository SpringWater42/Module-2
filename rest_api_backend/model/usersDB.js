import {pool} from '../config/db.js'


const getUser = async() => {
    try{
        let [row] = await pool.query( 'SELECT * FROM users;')
        return row
    } catch (error) {
        return error
    }
}

const postUser = async (id , username , password , role) => {
    await pool.query(`INSERT INTO users (id , username , password , role) VALUES (?,?,?,?);`,
    [id , username , password , role]
    )
} 
export {getUser , postUser}