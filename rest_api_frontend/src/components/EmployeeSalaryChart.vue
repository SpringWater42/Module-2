<template>
  <div class="chart-wrapper">
    <h3>Employee Salary Chart</h3>
    <Bar v-if="employeeInformation.length" :data="chartData" :options="chartOptions" />
    <p v-else>No employee data available.</p>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'EmployeeSalaryChart',
  components: { Bar },
  data() {
    return {
      employeeInformation: [
        { employeeId: 1, name: "Sibongile Nkosi", salary: 70000 },
        { employeeId: 2, name: "Lungile Moyo", salary: 80000 },
        { employeeId: 3, name: "Thabo Molefe", salary: 55000 },
        { employeeId: 4, name: "Keshav Naidoo", salary: 60000 },
        { employeeId: 5, name: "Zanele Khumalo", salary: 58000 },
        { employeeId: 6, name: "Sipho Zulu", salary: 65000 },
        { employeeId: 7, name: "Naledi Moeketsi", salary: 72000 },
        { employeeId: 8, name: "Farai Gumbo", salary: 56000 },
        { employeeId: 9, name: "Karabo Dlamini", salary: 62000 },
        { employeeId: 10, name: "Fatima Patel", salary: 58000 }
      ]
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.employeeInformation.map(emp => emp.name),
        datasets: [
          {
            label: 'Salary (ZAR)',
            backgroundColor: '#42b983',
            data: this.employeeInformation.map(emp => emp.salary)
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Employee Salaries' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => `R ${val.toLocaleString()}`
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  max-width: 900px;
  margin: 40px auto;
}
</style>
