<template>
  <div class="container mt-5">
    <div class="row g-4 justify-content-center">
      <!-- Employees Card -->
      <div class="col-md-4">
        <div class="stat-card employees">
          <h5 class="card-title">Employees</h5>
          <p class="stat-value">{{ employees }}</p>
        </div>
      </div>

      <!-- Average Salary Card -->
      <div class="col-md-4">
        <div class="stat-card salary">
          <h5 class="card-title">Average Salary</h5>
          <p class="stat-value">R{{ averageSalary.toLocaleString() }}</p>
        </div>
      </div>

      <!-- Average Attendance Card -->
      <div class="col-md-4">
        <div class="stat-card attendance">
          <h5 class="card-title">Average Attendance</h5>
          <p class="stat-value">{{ averageAttendance }} hrs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatsCards",
  data() {
    return {
      employees: 10,
      averageSalary: 63270,
      averageAttendance: 162,
    };
  },
};
</script>

<style scoped>
.stat-card {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}
.stat-card h5 {
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 0.75rem;
}
.stat-value {
  font-size: 2.75rem;
  font-weight: 700;
  margin: 0;
}

/* Individual card styles */
.employees {
  background: linear-gradient(135deg, #74ebd5, #9face6);
  color: #000000;
}
.salary {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  color: #000000;
}
.attendance {
  background: linear-gradient(135deg, #a18cd1, #fbc2eb);
  color: #000000;
}
</style>
