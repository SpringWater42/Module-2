import {
  getEmployees,
  postEmployees,
  patchEmployees,
  updateEmployees,
  deleteEmployees
} from "../model/employeeDB.js";

// GET: Retrieve all employees
const getEmployeeCon = async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json({ employees });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Error fetching employees" });
  }
};

// POST: Add a new employee
const postEmployeesCon = async (req, res) => {
  try {
    const {
      employee_id,
      name,
      position,
      department,
      salary,
      employmentHistory,
      contact
    } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    await postEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Internal server error while creating employee" });
  }
};

// PATCH: Partially update an employee
const patchEmployeesCon = async (req, res) => {
  try {
    const {
      employee_id,
      name,
      position,
      department,
      salary,
      employmentHistory,
      contact
    } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    await patchEmployees(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(200).json({ message: "Employee partially updated successfully" });
  } catch (err) {
    console.error("Patch error:", err);
    res.status(500).json({ error: "Internal server error while patching employee" });
  }
};

// DELETE: Remove an employee by ID
const deleteEmployeesCon = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }

    await deleteEmployees(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error while deleting employee" });
  }
};

const updateEmployeesCon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    console.log("🔁 Updating employee ID:", id);
    console.log("📦 New data:", updatedData);

    await updateEmployees(id, updatedData);
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};


export {
  getEmployeeCon,
  postEmployeesCon,
  patchEmployeesCon,
  deleteEmployeesCon,
  updateEmployeesCon
};
