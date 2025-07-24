import { getUser } from "../model/usersDB.js"

export const getUserCon = async(req,res) => {
    res.json({users: await getUser()})
}
