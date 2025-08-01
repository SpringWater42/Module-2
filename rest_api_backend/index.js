import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getUserCon, postUserCon } from './controller/usersCon.js';
import {
  getEmployeeCon,
  postEmployeesCon,
  deleteEmployeesCon,
  updateEmployeesCon
} from './controller/employeeCon.js';
import {
  getPerformanceCon,
  postPerformanceCon,
  updatePerformanceCon,
  deletePerformanceCon
} from './controller/performanceCon.js';
import {
  getAttendanceCon,
  postAttendanceCon,
  deleteAttendanceCon
} from './controller/attendanceCon.js';
import {
  getPayslipCon,
  getPayslipByIdCon,
  postPayslipCon,
  patchPayslipCon,
  deletePayslipCon
} from './controller/payrollCon.js';

import authRoutes from './routes/auth.js';

config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', authRoutes);

app.get('/users', getUserCon);
app.post('/users', postUserCon);

app.get('/employees', getEmployeeCon);
app.post('/employees', postEmployeesCon);
app.delete('/employees/:id', deleteEmployeesCon);
app.put('/employees/:id', updateEmployeesCon);

app.get('/performance', getPerformanceCon);
app.post('/performance', postPerformanceCon);
app.put('/performance/:id', updatePerformanceCon);  // update route
app.delete('/performance/:id', deletePerformanceCon);

app.get('/attendance', getAttendanceCon);
app.post('/attendance', postAttendanceCon);
app.delete('/attendance/:id', deleteAttendanceCon);

app.get('/payslip', getPayslipCon);
app.get('/payslip/:id', getPayslipByIdCon);
app.post('/payslip', postPayslipCon);
app.patch('/payslip', patchPayslipCon);
app.delete('/payslip/:id', deletePayslipCon);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
