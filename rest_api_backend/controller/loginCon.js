import { getUsers, checkPassword, addUsers } from '../model/loginDB.js'

export const getUsersCon = async(req, res) => {
    try {
        res.json({ users: await getUsers() })
    } catch(error) {
        console.log(error)
    } 
}

export const checkPasswordCon = async (req, res) => {
  try {
    const { password, hashPassword } = req.body;

    if (!password || !hashPassword) {
      return res.status(400).json({ error: 'Missing password or hashPassword' });
    }

    const match = await checkPassword(password, hashPassword);
    res.json({ status: match });

  } catch (error) {
    console.error('Error in checkPasswordCon:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addUsersCon = async(req, res) => {
    try {
        const { full_name, username, email, password } = req.body;
        addUsers(full_name, username, email, password)
        res.json({ message : "User added",
                users : await getUsers()
            })
    } catch(error) {
        console.log(error)
    }
};