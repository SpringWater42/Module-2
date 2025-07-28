import { getAttendance, postAttendance, deleteAttendance } from "../model/attendanceDB.js";

// Controller to get attendance
const getAttendanceCon = async (req, res) => {
  try {
    const attendance = await getAttendance();
    res.json({ attendance });
  } catch (err) {
    console.error("Error fetching attendance:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to post attendance
const postAttendanceCon = async (req, res) => {
  try {
    console.log("Attendance data:", req.body);

    const { id, employeeId, date, reason, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Inserting attendance:", id, employeeId, date, reason, status);

    await postAttendance(id, employeeId, date, reason, status);

    res.status(201).json({ message: "Attendance added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAttendanceCon = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteAttendance(id); // from attendanceDB.js
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (err) {
    console.error("Error deleting attendance:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAttendanceCon, postAttendanceCon, deleteAttendanceCon };
