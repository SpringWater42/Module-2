import express from 'express';
import { config } from 'dotenv';        

import { getUserCon,postUserCon } from './controller/usersCon.js';
import { getEmployeeCon, postEmployeesCon } from './controller/employeeCon.js';
import { getPerformanceCon, postPerformanceCon } from './controller/performanceCon.js';
import { getAttendanceCon,  postAttendanceCon } from './controller/attendanceCon.js';
import { getPayslipCon , postPayslipCon} from './controller/payrollCon.js';

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

app.get('/performance', getPerformanceCon);
app.post('/performance', postPerformanceCon)

app.get('/attendance', getAttendanceCon);
app.post('/attendance',  postAttendanceCon)

app.get('/payslip', getPayslipCon);
app.post('/payslip',  postPayslipCon);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});