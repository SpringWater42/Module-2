import { getEmployees , postEmployees ,patchEmployees } from "../model/employeeDB.js"

const getEmployeeCon = async(req,res) => {
    res.json({employees: await getEmployees()})
}

const postEmployeesCon = async (req, res) => {
  try {
    console.log("Received data:", req.body); 

    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    console.log("Inserting employee:", employee_id, name, position);

    await postEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchEmployeesCon = async (req, res) => {
  try {
    console.log("Received data:", req.body); 

    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    console.log("Inserting employee:", employee_id, name, position);

    await patchEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {getEmployeeCon, postEmployeesCon , patchEmployeesCon }