// controller/payslipController.js
import { getPayslip, postPayslip, patchPayslip, deletePayslip } from "../model/payslipDB.js";

// Get all payslips
const getPayslipCon = async (req, res) => {
  try {
    const payslip = await getPayslip();
    res.json({ payslip });
  } catch (err) {
    console.error("Error fetching payslips:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new payslip
const postPayslipCon = async (req, res) => {
  try {
    const { employeeId, hoursWorked, leaveDeductions, finalSalary } = req.body;

    if (!employeeId || hoursWorked == null || leaveDeductions == null || finalSalary == null) {
      return res.status(400).json({ error: "Missing required payslip fields" });
    }

    await postPayslip(employeeId, hoursWorked, leaveDeductions, finalSalary);
    res.status(201).json({ message: "Payslip added successfully" });
  } catch (err) {
    console.error("Error adding payslip:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

// Update a payslip
const patchPayslipCon = async (req, res) => {
  try {
    const { employeeId, hoursWorked, leaveDeductions, finalSalary } = req.body;

    if (!employeeId || hoursWorked == null || leaveDeductions == null || finalSalary == null) {
      return res.status(400).json({ error: "Missing fields for update" });
    }

    await patchPayslip(employeeId, hoursWorked, leaveDeductions, finalSalary);
    res.status(200).json({ message: "Payslip updated successfully" });
  } catch (err) {
    console.error("Error updating payslip:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a payslip
const deletePayslipCon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing employee ID" });
    }

    await deletePayslip(id);
    res.status(200).json({ message: "Payslip deleted successfully" });
  } catch (err) {
    console.error("Error deleting payslip:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getPayslipCon, postPayslipCon, patchPayslipCon, deletePayslipCon };
