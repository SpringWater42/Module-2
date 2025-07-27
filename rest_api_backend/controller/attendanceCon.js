import { getAttendance, postAttendance } from "../model/attendanceDB.js";

// Controller to get attendance
 const getAttendanceCon = async (req, res) => {
  res.json({ attendance: await getAttendance() });
};

// Controller to post attendance
 const postAttendanceCon = async (req, res) => {
  try {
    console.log("Attendance data:", req.body);

    const { id , employeeId , date , reason ,  status   } = req.body;

    if (!employeeId) {
      return res.status(400).json({ error: "Missing employeeId" });
    }

    console.log("Inserting employee:", id ,employeeId , date , reason ,  status);

    await postAttendance( id , employeeId , date , reason ,  status );

    res.status(201).json({ message: "Employee added successfully" });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export controllers
export { getAttendanceCon, postAttendanceCon };
