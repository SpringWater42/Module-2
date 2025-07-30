import { pool } from '../config/db.js'
import { hash, compare } from 'bcrypt'

export const getUsers = async () => {
    try {
        let [row] = await pool.query("SELECT * FROM users") 
        return row
    } catch (error) {
        throw new Error('Database error: ' + err.message);
    }
}

export const checkPassword = async (password, hashPassword) => {
    try {
        return await compare(password, hashPassword)
    } catch (error) {
        throw new Error('Database error: ' + error.message);
    }
}

export const addUsers = async (full_name, username, email, password) => {
    const hashedPassword = await hash(password, 10)
    try {
        await pool.query('INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)',
            [full_name, username, email, hashedPassword]);
    } catch (err) {
        throw new Error('Database error: ' + err.message);
    }
}



