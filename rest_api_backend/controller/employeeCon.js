import { getEmployees, postEmployees, patchEmployees, deleteEmployees } from "../model/employeeDB.js";

const getEmployeeCon = async (req, res) => {
  res.json({ employees: await getEmployees() });
};

const postEmployeesCon = async (req, res) => {
  try {
    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;
    if (!employee_id) return res.status(400).json({ error: "Missing employee_id" });

    await postEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const patchEmployeesCon = async (req, res) => {
  try {
    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;
    if (!employee_id) return res.status(400).json({ error: "Missing employee_id" });

    await patchEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEmployeesCon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    console.log("Deleting employee with ID:", id);

    await deleteEmployees(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getEmployeeCon, postEmployeesCon, patchEmployeesCon, deleteEmployeesCon };
