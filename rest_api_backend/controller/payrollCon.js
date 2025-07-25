import { getPayslip , postPayslip } from "../model/payslipDB.js"

export const getPayslipCon = async(req,res) => {
    res.json({payslip: await getPayslip()})
}



const postPayslipCon = async (req, res) => {
  try {
    console.log("Received data:", req.body); 

    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    console.log("Inserting employee:", employee_id, name, position);

    await postPayslip(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getPayslip , postPayslip}