import { getPayslip , postPayslip } from "../model/payslipDB.js"

export const getPayslipCon = async(req,res) => {
    res.json({payslip: await getPayslip()})
}



const postPayslipCon = async (req, res) => {
  try {
    console.log("Received data payroll:", req.body); 

    const { id, employeeId, hoursWorked, leaveDeductions, finalSalary } = req.body;

    // Basic validation to ensure all fields are provided
    if (!id || !employeeId || hoursWorked == null || leaveDeductions == null || finalSalary == null) {
      return res.status(400).json({ error: "Missing required payslip fields" });
    }

    console.log("Inserting payslip:", id, employeeId, hoursWorked, leaveDeductions, finalSalary);

    await postPayslip(id, employeeId, hoursWorked, leaveDeductions, finalSalary);
    
    res.status(201).json({ message: "Payslip added successfully" });

  } catch (err) {
    console.error("Error adding payslip:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export { getPayslip , postPayslipCon}