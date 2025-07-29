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

      <button @click="downloadPayslip(payslip)" class="btn btn-secondary btn-sm mt-2">Download PDF</button>
      <button @click="deletePayslip(payslip.employeeId)" class="btn btn-danger btn-sm mt-2">Delete</button>
    </div>
  </div>

  <!-- Hidden PDF Template -->
  <div
    id="pdf-template"
    style="display: none; padding: 30px; font-family: Arial, sans-serif; color: #000; width: 100%; max-width: 600px; margin: auto;"
  >
    <h2 style="text-align: center; margin-bottom: 20px;">Payslip</h2>
    <hr />
    <p><strong>Employee ID:</strong> <span id="pdf-employeeId"></span></p>
    <p><strong>Hours Worked:</strong> <span id="pdf-hoursWorked"></span></p>
    <p><strong>Leave Deductions:</strong> R <span id="pdf-leaveDeductions"></span></p>
    <p><strong>Final Salary:</strong> R <span id="pdf-finalSalary"></span></p>
    <hr />
    <h4>Salary Breakdown</h4>
    <table
      style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 16px;"
      border="1"
      cellpadding="8"
    >
      <tr>
        <td style="font-weight: bold;">Taxable Income</td>
        <td style="text-align: right;">R <span id="pdf-taxableIncome"></span></td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Monthly PAYE (18%)</td>
        <td style="text-align: right;">R <span id="pdf-paye"></span></td>
      </tr>
      <tr>
        <td style="font-weight: bold;">UIF (1%)</td>
        <td style="text-align: right;">R <span id="pdf-uif"></span></td>
      </tr>
      <tr>
        <td style="font-weight: bold; text-decoration: underline;">Take Home Pay</td>
        <td
          style="text-align: right; font-weight: bold; text-decoration: underline;"
        >
          R <span id="pdf-takeHome"></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

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
    },
    deletePayslip(id) {
      if (confirm("Are you sure you want to delete this payslip?")) {
        this.$store.dispatch("deletePayslip", id)
          .then(() => {
            alert("Payslip deleted!");
            this.$store.dispatch("getPayslip");
          })
          .catch((err) => {
            console.error("Failed to delete payslip:", err);
            alert("Error deleting payslip.");
          });
      }
    },
    calculatePayslipData(payslip) {
      const hourlyRate = 50;
      const grossPay = payslip.hoursWorked * hourlyRate;
      const taxableIncome = grossPay - payslip.leaveDeductions;
      const paye = taxableIncome * 0.18;
      const uif = grossPay * 0.01;
      const takeHome = taxableIncome - paye - uif;

      return {
        grossPay,
        taxableIncome: taxableIncome.toFixed(2),
        monthlyPAYE: paye.toFixed(2),
        uif: uif.toFixed(2),
        takeHome: takeHome.toFixed(2)
      };
    },
    downloadPayslip(payslip) {
      const calc = this.calculatePayslipData(payslip);

      document.getElementById("pdf-employeeId").innerText = payslip.employeeId;
      document.getElementById("pdf-hoursWorked").innerText = payslip.hoursWorked;
      document.getElementById("pdf-leaveDeductions").innerText = payslip.leaveDeductions;
      document.getElementById("pdf-finalSalary").innerText = payslip.finalSalary;

      document.getElementById("pdf-taxableIncome").innerText = calc.taxableIncome;
      document.getElementById("pdf-paye").innerText = calc.monthlyPAYE;
      document.getElementById("pdf-uif").innerText = calc.uif;
      document.getElementById("pdf-takeHome").innerText = calc.takeHome;

      const element = document.getElementById("pdf-template");
      const opt = {
        margin: 0.5,
        filename: `Payslip_${payslip.employeeId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };

      html2pdf().from(element).set(opt).save();
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
