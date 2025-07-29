import { getEmployees, postEmployees, patchEmployees, deleteEmployees , updateEmployees } from "../model/employeeDB.js";

// Get all employees
const getEmployeeCon = async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json({ employees });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Error fetching employees" });
  }
};

// Create a new employee
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

// Partially update an employee (PATCH)
const patchEmployeesCon = async (req, res) => {
  try {
    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;
    if (!employee_id) return res.status(400).json({ error: "Missing employee_id" });

    await patchEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(200).json({ message: "Employee partially updated successfully" });
  } catch (err) {
    console.error("Patch Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an employee
const deleteEmployeesCon = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEmployees(id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error deleting employee" });
  }
};

// Fully update an employee (PUT or custom endpoint)
const updateEmployeesCon = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    await updateEmployees(id, updatedData);
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

export { getEmployeeCon, postEmployeesCon, patchEmployeesCon, deleteEmployeesCon , updateEmployeesCon };
