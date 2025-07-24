import { getPayslip } from "../model/payslipDB.js"

export const getPayslipCon = async(req,res) => {
    res.json({payslip: await getPayslip()})
}