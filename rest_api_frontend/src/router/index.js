import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import PayRollView from '@/views/PayrollView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import PerformanceView from '@/views/PerformanceView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import Login from '@/views/Login.vue'

const routes = [
   {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesView,
  
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayRollView
  },
 
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView
  },
  {
    path: '/performance',
    name: 'performance',
    component: PerformanceView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

