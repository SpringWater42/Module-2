<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="payslip-card-container">
      <div
        v-for="payslip in payslips"
        :key="payslip.payslipsId"
        class="payslip-card"
        :id="'payslip-' + payslip.employees_id"
      >
        <p class="payslip-title">Employee ID: {{ payslip.employees_id }}</p>
        <p class="payslip-detail">Hours Worked: {{ payslip.hoursWorked }}</p>
        <p class="payslip-detail">Leave Deductions: {{ payslip.leaveDeductions }}</p>
        <p class="payslip-detail">Final Salary: R {{ payslip.finalSalary }}</p>

        <!-- Show calculated salary details if calculated -->
        <div v-if="payslip.takeHomePay" class="calculated-details">
          <p>Taxable Income: R {{ payslip.takeHomePay.taxableIncome }}</p>
          <p>Monthly PAYE: R {{ payslip.takeHomePay.monthlyPAYE }}</p>
          <p>UIF: R {{ payslip.takeHomePay.uif }}</p>
          <p><strong>Take Home Pay: R {{ payslip.takeHomePay.takeHome }}</strong></p>
        </div>

        <button class="download-btn" @click="downloadPDF(payslip)">
          Download PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import html2pdf from "html2pdf.js";

export default {
  mounted() {
    this.$store.dispatch("getPayslip");
  },
  computed: {
    ...mapState(["payrollData"]),
    payslips() {
      return this.$store.state.payslip;
    }
  },
  methods: {
    calculateTakeHome(employee) {
      const salary = employee.finalSalary;
      const leaveDeductions = employee.leaveDeductions;
      const travelAllowance = employee.travelAllowance ?? 0;

      const hoursInMonth = 160;
      const leaveDeductionAmount = leaveDeductions * (salary / hoursInMonth);

      const leaveDeduction = Math.min(
        leaveDeductionAmount,
        salary * 0.275,
        350000
      );
      const travelDeduction = travelAllowance > 0 ? travelAllowance * 0.2 : 0;
      const taxableIncome = salary - leaveDeduction - travelDeduction;

      let paye = 0;
      if (taxableIncome <= 237100) {
        paye = taxableIncome * 0.18;
      } else {
        paye = 42678 + (taxableIncome - 237100) * 0.26;
      }

      const monthlyPAYE = paye / 12;
      const uif = Math.min(salary * 0.01, 177.12);
      const takeHome = salary - monthlyPAYE - uif;

      // Assign calculated data back to the payslip object (reactive)
      this.$set(employee, "takeHomePay", {
        taxableIncome: taxableIncome.toFixed(2),
        monthlyPAYE: monthlyPAYE.toFixed(2),
        uif: uif.toFixed(2),
        takeHome: takeHome.toFixed(2),
      });
    },
    downloadPDF(employee) {
      this.calculateTakeHome(employee);
      this.$nextTick(() => {
        const element = document.getElementById(
          "payslip-" + employee.employees_id
        );
        const options = {
          margin: 0.5,
          filename: `Payslip_${employee.employees_id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        html2pdf().set(options).from(element).save();
      });
    }
  }
};
</script>

<style scoped>
.payslip-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.payslip-card {
  background: linear-gradient(to right, #202088, #794a79);
  border-radius: 10px;
  padding: 20px;
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

.download-btn {
  margin-top: 10px;
  background-color: #ffffff;
  color: #202088;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.download-btn:hover {
  background-color: #ddddff;
}

@media (max-width: 768px) {
  .payslip-card {
    width: 90%;
  }
}
</style>
