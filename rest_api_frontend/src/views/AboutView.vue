<template>
  <!-- Add Payslip Button -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Add Payslip +
  </button>

  <!-- Modal for Adding Payslip -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitPayslip">
            <br />
            <input type="text" v-model="payslip.employeeId" placeholder="Employee ID" required />
            <br />
            <input type="number" v-model="payslip.hoursWorked" placeholder="Hours Worked" required />
            <br />
            <input type="number" v-model="payslip.leaveDeductions" placeholder="Leave Deductions" required />
            <br />
            <input type="number" v-model="payslip.finalSalary" placeholder="Final Salary" required />
            <br />
            <input type="submit" value="Submit" class="btn btn-success mt-2" />
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Payslip Cards -->
  <div class="card-container">
    <div
      v-for="payslip in payslips"
      :key="payslip.employeeId"
      class="payslip-card"
      :id="'payslip-' + payslip.employeeId"
    >
      <p class="payslip-title">Employee ID: {{ payslip.employeeId }}</p>
      <p class="payslip-detail">Hours Worked: {{ payslip.hoursWorked }}</p>
      <p class="payslip-detail">Leave Deductions: {{ payslip.leaveDeductions }}</p>
      <p class="payslip-detail">Final Salary: R {{ payslip.finalSalary }}</p>

      <div v-if="payslip.takeHomePay" class="calculated-details">
        <p>Taxable Income: R {{ payslip.takeHomePay.taxableIncome }}</p>
        <p>Monthly PAYE: R {{ payslip.takeHomePay.monthlyPAYE }}</p>
        <p>UIF: R {{ payslip.takeHomePay.uif }}</p>
        <p><strong>Take Home Pay: R {{ payslip.takeHomePay.takeHome }}</strong></p>
      </div>

      <!-- Delete Button -->
      <button @click="deletePayslip(payslip.employeeId)" class="btn btn-danger btn-sm mt-2">Delete</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      payslip: {
        employeeId: '',
        hoursWorked: '',
        leaveDeductions: '',
        finalSalary: ''
      }
    };
  },
  mounted() {
    this.$store.dispatch('getPayslip');
  },
  computed: {
    payslips() {
      return this.$store.state.payslip;
    }
  },
  methods: {
    submitPayslip() {
      this.$store.dispatch("postPayslip", this.payslip)
        .then(() => {
          alert("Payslip added!");
          this.$store.dispatch('getPayslip');
          this.payslip = {
            employeeId: '',
            hoursWorked: '',
            leaveDeductions: '',
            finalSalary: ''
          };
        })
        .catch(err => {
          console.error("Error adding payslip:", err);
          alert("Failed to add payslip.");
        });
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.payslip-card {
  background: linear-gradient(to right, #202088, #794a79);
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}

.payslip-card:hover {
  transform: scale(1.05);
}

.payslip-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}

.payslip-detail,
.calculated-details p {
  margin: 4px 0;
  font-size: 0.95rem;
  text-align: center;
}

@media (max-width: 768px) {
  .payslip-card {
    width: 90%;
  }
}
</style>
