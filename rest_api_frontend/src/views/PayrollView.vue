<template>
  <div class="payslip-system">
    <!-- Add Payslip Button -->
    <div class="text-center mb-4">
      <button class="btn-generate" @click="openPayslipModal">
        <i class="fas fa-file-invoice-dollar me-2"></i>Generate Payslip
      </button>
    </div>
    <!-- Payslip Input Modal -->
    <div class="modal fade" id="payslipModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Generate New Payslip</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitPayslip">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Employee ID</label>
                  <input type="text" v-model="payslip.employeeId" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Hours Worked</label>
                  <input type="number" v-model="payslip.hoursWorked" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Leave Deductions (R)</label>
                  <input type="number" v-model="payslip.leaveDeductions" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Hourly Rate (R)</label>
                  <input type="number" v-model="hourlyRate" class="form-control" required>
                </div>
              </div>
              <button type="submit" class="btn-submit mt-4">
                <i class="fas fa-calculator me-2"></i>Calculate & Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Payslip Preview Modal -->
    <div class="modal fade" id="payslipPreviewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payslip Preview</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="payslip-preview">
              <div class="payslip-header">
                <div class="company-logo">
                  <i class="fas fa-building fa-3x"></i>
                </div>
                <div class="company-info">
                  <h2>ModernTech Solutions</h2>
                  <p>123 Business Street, Johannesburg</p>
                </div>
              </div>
              <div class="payslip-title">
                <h3>MONTHLY PAYSLIP</h3>
                <p>Pay Period: {{ currentDate }}</p>
              </div>
              <div class="employee-info">
                <div>
                  <p><strong>Employee ID:</strong> {{ previewData.employeeId }}</p>
                  <p><strong>Pay Date:</strong> {{ currentDate }}</p>
                </div>
              </div>
              <div class="payslip-details">
                <div class="earnings">
                  <h4>Earnings</h4>
                  <table>
                    <tr>
                      <td>Basic Salary ({{ previewData.hoursWorked }} hrs @ R{{ hourlyRate }}/hr)</td>
                      <td>R {{ previewData.grossPay }}</td>
                    </tr>
                  </table>
                </div>
                <div class="deductions">
                  <h4>Deductions</h4>
                  <table>
                    <tr>
                      <td>Leave Deductions</td>
                      <td>R {{ previewData.leaveDeductions }}</td>
                    </tr>
                    <tr>
                      <td>PAYE (18%)</td>
                      <td>R {{ previewData.monthlyPAYE }}</td>
                    </tr>
                    <tr>
                      <td>UIF (1%)</td>
                      <td>R {{ previewData.uif }}</td>
                    </tr>
                  </table>
                </div>
                <div class="summary">
                  <table>
                    <tr>
                      <td><strong>Taxable Income:</strong></td>
                      <td><strong>R {{ previewData.taxableIncome }}</strong></td>
                    </tr>
                    <tr class="total">
                      <td><strong>Net Pay:</strong></td>
                      <td><strong>R {{ previewData.takeHome }}</strong></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="payslip-footer">
                <p>This is a computer generated payslip and does not require a signature.</p>
              </div>
            </div>
            <div class="text-center mt-4">
              <button class="btn-download" @click="downloadPayslip(previewData)">
                <i class="fas fa-download me-2"></i>Download PDF
              </button>
              <button class="btn-print ms-2" @click="printPayslip()">
                <i class="fas fa-print me-2"></i>Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Payslip Cards -->
    <div class="payslip-grid">
      <div v-for="payslip in payslips" :key="payslip.employeeId" class="payslip-card">
        <div class="card-header">
          <h4><i class="fas fa-id-card me-2"></i>{{ payslip.employeeId }}</h4>
          <span class="badge-paid">PAID</span>
        </div>
        <div class="card-body">
          <div class="payslip-info">
            <div>
              <span>Hours:</span>
              <strong>{{ payslip.hoursWorked }}</strong>
            </div>
            <div>
              <span>Deductions:</span>
              <strong>R {{ payslip.leaveDeductions }}</strong>
            </div>
            <div>
              <span>Salary:</span>
              <strong>R {{ payslip.finalSalary }}</strong>
            </div>
          </div>
          <div class="payslip-actions">
            <button class="btn-view" @click="viewPayslip(payslip)">
              <i class="fas fa-eye me-1"></i>View
            </button>
            <button class="btn-delete" @click="deletePayslip(payslip.employeeId)">
              <i class="fas fa-trash me-1"></i>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
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
      },
      hourlyRate: 50,
      previewData: {},
      currentDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
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
    openPayslipModal() {
      this.payslip = {
        employeeId: '',
        hoursWorked: '',
        leaveDeductions: '',
        finalSalary: ''
      };
      const modal = new bootstrap.Modal(document.getElementById('payslipModal'));
      modal.show();
    },
    submitPayslip() {
      // Calculate final salary
      const calculated = this.calculatePayslipData({
        ...this.payslip,
        hourlyRate: this.hourlyRate
      });
      this.payslip.finalSalary = calculated.takeHome;
      this.$store.dispatch("postPayslip", this.payslip)
        .then(() => {
          this.$store.dispatch('getPayslip');
          this.payslip = {
            employeeId: '',
            hoursWorked: '',
            leaveDeductions: '',
            finalSalary: ''
          };
          // Show preview modal
          this.previewData = {
            ...this.payslip,
            ...calculated
          };
          const previewModal = new bootstrap.Modal(document.getElementById('payslipPreviewModal'));
          previewModal.show();
        })
        .catch(err => {
          console.error("Error adding payslip:", err);
          alert("Failed to add payslip.");
        });
    },
    viewPayslip(payslip) {
      this.previewData = {
        ...payslip,
        ...this.calculatePayslipData({
          ...payslip,
          hourlyRate: this.hourlyRate
        })
      };
      const previewModal = new bootstrap.Modal(document.getElementById('payslipPreviewModal'));
      previewModal.show();
    },
    deletePayslip(id) {
      if (confirm("Are you sure you want to delete this payslip?")) {
        this.$store.dispatch("deletePayslip", id)
          .then(() => {
            this.$store.dispatch("getPayslip");
          })
          .catch((err) => {
            console.error("Failed to delete payslip:", err);
            alert("Error deleting payslip.");
          });
      }
    },
    calculatePayslipData(data) {
      const grossPay = data.hoursWorked * this.hourlyRate;
      const taxableIncome = grossPay - data.leaveDeductions;
      const paye = taxableIncome * 0.18;
      const uif = grossPay * 0.01;
      const takeHome = taxableIncome - paye - uif;
      return {
        grossPay: grossPay.toFixed(2),
        taxableIncome: taxableIncome.toFixed(2),
        monthlyPAYE: paye.toFixed(2),
        uif: uif.toFixed(2),
        takeHome: takeHome.toFixed(2)
      };
    },
    downloadPayslip(payslip) {
      const element = document.getElementById('payslipPreviewModal').querySelector('.payslip-preview');
      const opt = {
        margin: 10,
        filename: `Payslip_${payslip.employeeId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    },
    printPayslip() {
      window.print();
    }
  }
};
</script>
10:57
<style scoped>
.payslip-system {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
/* Buttons */
.btn-generate {
  background: linear-gradient(135deg, #2C3E50, #4A6491);
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.btn-generate:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  background: linear-gradient(135deg, #4A6491, #2C3E50);
}
.btn-submit {
  background: linear-gradient(135deg, #F1C40F, #E67E22);
  color: #2C3E50;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 8px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.btn-download {
  background: #2C3E50;
  color: rgb(255, 255, 255);
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-download:hover {
  background: #1A2636;
}
.btn-print {
  background: #F1C40F;
  color: #2C3E50;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-print:hover {
  background: #D4AB0D;
}
/* Payslip Cards */
.payslip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.payslip-card {
 background: linear-gradient(to right, #202088, #794A79);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}
.payslip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}
.card-header {
  background: #2C3E50;
  color: rgb(251, 251, 251);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header h4 {
  margin: 0;
  font-size: 1.1rem;
}
.badge-paid {
  background: #F1C40F;
  color: #2C3E50;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}
.card-body {
  padding: 1.2rem;
}
.payslip-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}
.payslip-info div {
  display: flex;
  flex-direction: column;
}
.payslip-info span {
  font-size: 0.8rem;
  color: #FFFFFF;
}
.payslip-info strong {
  font-size: 1rem;
  color: #F5F5F5;
}
.payslip-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-view {
  background: #2C3E50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}
.btn-view:hover {
  background: #1A2636;
}
.btn-delete {
  background: #E74C3C;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}
.btn-delete:hover {
  background: #C0392B;
}
/* Payslip Preview */
.payslip-preview {
  background: rgb(235, 234, 234);
  border: 1px solid #eee;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
}
.payslip-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}
.company-logo {
  margin-right: 1.5rem;
  color: #2C3E50;
}
.company-info h2 {
  margin: 0;
  color: #2C3E50;
}
.company-info p {
  margin: 0.25rem 0 0;
  color: #666;
}
.payslip-title {
  text-align: center;
  margin-bottom: 1.5rem;
}
.payslip-title h3 {
  margin: 0;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.payslip-title p {
  margin: 0.5rem 0 0;
  color: #E8E6E6;
}
.employee-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}
.payslip-details {
  margin-bottom: 1.5rem;
}
.earnings, .deductions {
  margin-bottom: 1.5rem;
}
.earnings h4, .deductions h4 {
  color: #2C3E50;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #eee;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table td {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
table tr:last-child td {
  border-bottom: none;
}
.summary {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid #2C3E50;
}
.summary table tr:last-child td {
  font-weight: bold;
  font-size: 1.1rem;
}
.total td {
  padding-top: 1rem;
  color: #2C3E50;
}
.payslip-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 0.85rem;
  color: #666;
}
@media (max-width: 768px) {
  .payslip-grid {
    grid-template-columns: 1fr;
  }
  .payslip-preview {
    padding: 1rem;
  }
}
</style>