import { getUser, postUser } from "../model/usersDB.js";

// Controller for fetching users
 const getUserCon = async (req, res) => {
  try {
    const users = await getUser();
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Controller for adding a payslip (maybe you meant to call it postPayslipCon?)
 const postUserCon = async (req, res) => {
  try {
    console.log("Received data payroll:", req.body);

    const { id , username , password , role } = req.body;

    // Basic validation
    if (!id || !username || password == null ||  role == null) {
      return res.status(400).json({ error: "Missing required payslip fields" });
    }

    console.log("Inserting payslip:", id , username , password , role);

    await postUser(id , username , password , role);

    res.status(201).json({ message: "Payslip added successfully" });

  } catch (err) {
    console.error("Error adding payslip:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export { getUserCon, postUserCon };