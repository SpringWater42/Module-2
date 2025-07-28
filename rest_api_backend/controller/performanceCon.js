import { getPerformance ,  postPerformance , deletePerformance } from "../model/performanceDB.js"

export const getPerformanceCon= async(req,res) => {
    res.json({performance: await getPerformance()})
}





export const postPerformanceCon= async (req, res) => {
  try {
    console.log("Received data:", req.body); 

    const { employeeId, name, position, department, salary, employmentHistory, contact } = req.body;

    if (!employeeId) {
      return res.status(400).json({ error: "Missing employeeId" });
    }

    console.log("Inserting employee:", employeeId, name, position);

    await postPerformance(employeeId, name, position, department, salary, employmentHistory, contact);
    res.status(201).json({ message: "Employee added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePerformanceCon = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePerformance(id);
    res.status(200).json({ message: "Performance record deleted." });
  } catch (err) {
    console.error("Error deleting performance:", err);
    res.status(500).json({ error: "Failed to delete performance." });
  }
};


export { getPerformance }