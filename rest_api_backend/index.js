import express from 'express';
import { config } from 'dotenv';        

import { getUserCon,postUserCon } from './controller/usersCon.js';
import { getEmployeeCon, postEmployeesCon  , deleteEmployeesCon} from './controller/employeeCon.js';
import { getPerformanceCon, postPerformanceCon ,  deletePerformanceCon} from './controller/performanceCon.js';
import { getAttendanceCon,  postAttendanceCon  , deleteAttendanceCon} from './controller/attendanceCon.js';
import { getPayslipCon , postPayslipCon , deletePayslipCon} from './controller/payrollCon.js';

import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());

app.get('/users', getUserCon);
app.post('/users', postUserCon);

app.get('/employees', getEmployeeCon);
app.post('/employees', postEmployeesCon);
app.delete('/employees/:id', deleteEmployeesCon);

app.get('/performance', getPerformanceCon);
app.post('/performance', postPerformanceCon);
app.delete("/performance/:id", deletePerformanceCon);


app.get('/attendance', getAttendanceCon);
app.post('/attendance',  postAttendanceCon)
app.delete('/attendance/:id', deleteAttendanceCon);

app.get('/payslip', getPayslipCon);
app.post('/payslip',  postPayslipCon);
app.delete('/payslip/:id',  deletePayslipCon);




app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});