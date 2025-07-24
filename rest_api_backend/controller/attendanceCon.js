import { getAttendance } from "../model/payslipDB.js"

export const getAttendanceCon = async(req,res) => {
    res.json({payslip: await getAttendance()})
}