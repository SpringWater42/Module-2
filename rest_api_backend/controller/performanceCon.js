import { getPerformance, postPerformance } from "../model/performanceDB.js";

// GET all performance reviews
export const getPerformanceCon = async (req, res) => {
  try {
    const data = await getPerformance();
    res.json({ performance: data });
  } catch (err) {
    console.error("Failed to fetch performance data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST a new performance review
 const postPerformanceCon = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { id, employeeId, rating, description, review_month } = req.body;

    if (!employeeId) {
      return res.status(400).json({ error: "Missing employeeId" });
    }

    console.log("Inserting performance record:", id, employeeId, rating, description, review_month);

    await postPerformance(id, employeeId, rating, description, review_month);
    res.status(201).json({ message: "Performance added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// (Optional) export individual DB function if needed elsewhere
export { getPerformance , postPerformanceCon };
