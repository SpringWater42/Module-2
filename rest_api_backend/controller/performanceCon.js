import { getPerformance } from "../model/payslipDB.js"

export const getPerformceCon = async(req,res) => {
    res.json({payslip: await getPerformance()})
}