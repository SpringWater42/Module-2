import { getPerformance ,  postPerformance } from "../model/performanceDB.js"

export const getPerformanceCon= async(req,res) => {
    res.json({performance: await getPerformance()})
}





export const postPerformanceCon= async (req, res) => {
  try {
    console.log("Received data:", req.body); 

    const { employee_id, name, position, department, salary, employmentHistory, contact } = req.body;

    if (!employee_id) {
      return res.status(400).json({ error: "Missing employee_id" });
    }

    console.log("Inserting employee:", employee_id, name, position);

    await postPerformance(employee_id, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



export { getPerformance }