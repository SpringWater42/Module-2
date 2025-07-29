<template>
  <h2>Dashboard</h2>

  <!-- Count card -->
  <div class="employee-count-card">
    <h5>Total Employees</h5>
    <h1>{{ employees.length }}</h1>
  </div>

  <div class="employee-count-card">
    <h5>Total Employees</h5>
    <h1>{{ payslips.length }}</h1>
  </div>

</template>

<script>
export default {
  computed: {
    employees() {
      return this.$store.state.employees || [];
    },
    payslips() {
      return this.$store.state.payslip || [];
    }
  },
  
  mounted() {
    // Fetch employees when dashboard is opened
    this.$store.dispatch('getEmployees');
    this.$store.dispatch('getPayslip');
  }
};
</script>

<style>
.employee-count-card {
  background: linear-gradient(to right, #17a2b8, #6610f2);
  color: #fff;
  padding: 20px;
  margin: 20px auto;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
}

.employee-count-card:hover {
  transform: scale(1.03);
}


</style>