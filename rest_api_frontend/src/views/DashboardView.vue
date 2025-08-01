<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <div class="dashboard-layout">
      <!-- Vertical cards column -->
      <div class="cards-column">
        <div class="count-card" style="background: linear-gradient(to right, #202088, #794A79)">
          <h5>Total Employees</h5>
          <h1>{{ employees.length }}</h1>
        </div>
        <div class="count-card" style="background: linear-gradient(to right, #202088, #794A79)">
          <h5>Total Payslips</h5>
          <h1>{{ payslips.length }}</h1>
        </div>
        <div class="count-card" style="background: linear-gradient(to right, #202088, #794A79)">
          <h5>Total Hours Worked</h5>
          <h1>{{ totalHours }}</h1>
        </div>
        <div class="count-card" style="background: linear-gradient(to right, #202088, #794A79)">
          <h5>Combined Salary</h5>
          <h1>R {{ combinedSalary.toLocaleString() }}</h1>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-card">
          <h4>Employees by Department</h4>
          <div class="chart-container">
            <canvas ref="departmentChart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <h4>Salary Distribution</h4>
          <div class="chart-container">
            <canvas ref="salaryChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      departmentChartInstance: null,
      salaryChartInstance: null
    };
  },
  computed: {
    employees() {
      return this.$store.state.employees || [];
    },
    payslips() {
      return this.$store.state.payslip || [];
    },
    totalHours() {
      return this.payslips.reduce((total, payslip) => total + (payslip.hoursWorked || 0), 0);
    },
    combinedSalary() {
      return this.employees.reduce((total, emp) => total + (emp.salary || 0), 0);
    },
    departmentData() {
      const departments = {};
      this.employees.forEach(emp => {
        departments[emp.department] = (departments[emp.department] || 0) + 1;
      });
      return {
        labels: Object.keys(departments),
        counts: Object.values(departments)
      };
    },
    salaryData() {
      const ranges = {
        'Under R50k': 0,
        'R50k-R70k': 0,
        'R70k-R90k': 0,
        'Over R90k': 0
      };
      this.employees.forEach(emp => {
        const salary = emp.salary;
        if (salary < 50000) ranges['Under R50k']++;
        else if (salary < 70000) ranges['R50k-R70k']++;
        else if (salary < 90000) ranges['R70k-R90k']++;
        else ranges['Over R90k']++;
      });
      return {
        labels: Object.keys(ranges),
        counts: Object.values(ranges)
      };
    }
  },
  mounted() {
    this.$store.dispatch('getEmployees');
    this.$store.dispatch('getPayslip');
  },
  watch: {
    employees(newVal) {
      if (newVal.length > 0) {
        this.$nextTick(() => {
          this.createDepartmentChart();
          this.createSalaryChart();
        });
      }
    }
  },
  methods: {
    createDepartmentChart() {
      if (this.departmentChartInstance) {
        this.departmentChartInstance.destroy();
      }
      this.departmentChartInstance = new Chart(this.$refs.departmentChart, {
        type: 'bar',
        data: {
          labels: this.departmentData.labels,
          datasets: [{
            label: 'Employees',
            data: this.departmentData.counts,
            backgroundColor: '#F1C40F',
            borderColor: '#F1C40F',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Employees',
                color: '#fff'
              },
              ticks: {
                color: '#fff'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Department',
                color: '#fff'
              },
              ticks: {
                color: '#fff'
              }
            }
          }
        }
      });
    },

    createSalaryChart() {
      if (this.salaryChartInstance) {
        this.salaryChartInstance.destroy();
      }
      this.salaryChartInstance = new Chart(this.$refs.salaryChart, {
        type: 'pie',
        data: {
          labels: this.salaryData.labels,
          datasets: [{
            label: 'Employees',
            data: this.salaryData.counts,
            backgroundColor: [
              '#2C3E50',
              '#F1C40F',
              '#E67E22',
              '#3498DB'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#fff'
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.dashboard-container h2 {
  color: #e0e0e0; /* Light grey for better readability */
}

.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.dashboard-layout {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.cards-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 250px;
}
.count-card {
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.count-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.count-card h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
}
.count-card h1 {
  margin: 0;
  font-size: 2.25rem;
}
.charts-section {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.chart-card {
  color: rgb(233, 233, 233);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 350px;
  background: #1e1e2f;
}
.chart-card h4 {
  text-align: center;
  margin-bottom: 1rem;
  color: #FFFFFF;
  font-weight: 600;
}
.chart-container {
  position: relative;
  flex: 1;
  min-height: 250px;
}
.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}
@media (max-width: 992px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .cards-column {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .cards-column .count-card {
    flex: 1 1 200px;
  }
}
@media (max-width: 576px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
  .cards-column .count-card {
    flex: 1 1 100%;
  }
  .chart-card {
    height: auto;
    min-height: 300px;
  }
}
</style>
