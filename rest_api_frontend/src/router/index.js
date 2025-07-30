import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import PayRollView from '@/views/PayrollView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import PerformanceView from '@/views/PerformanceView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
    {
    path: '/',
    name: 'login',
    component: LoginView
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

