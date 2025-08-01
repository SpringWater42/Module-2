<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Attendance</h2>

    <!-- Add Attendance Button -->
    <div class="text-center mb-4">
      <button class="btn btn-primary" @click="openAddModal">
        Add Attendance
      </button>
    </div>

    <!-- Attendance Modal -->
    <div
      class="modal fade"
      id="attendanceModal"
      tabindex="-1"
      aria-labelledby="attendanceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="attendanceModalLabel">
              {{ isEdit ? "Edit Attendance" : "Add Attendance" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAttendance">
              <input
                type="text"
                v-model="attendanceForm.employeeId"
                placeholder="Employee ID"
                required
                class="form-control mb-2"
              />
              <input
                type="date"
                v-model="attendanceForm.date"
                required
                class="form-control mb-2"
              />
              <input
                type="text"
                v-model="attendanceForm.reason"
                placeholder="Reason"
                required
                class="form-control mb-2"
              />
              <select
                v-model="attendanceForm.status"
                required
                class="form-control mb-3"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Denied">Denied</option>
              </select>
              <input
                type="submit"
                :value="isEdit ? 'Update' : 'Submit'"
                class="btn btn-primary w-100"
              />
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Grouped Attendance Cards in rows of 2 -->
    <div class="attendance-groups">
      <div
        v-for="(entries, employeeId) in groupedAttendance"
        :key="employeeId"
        class="attendance-group"
      >
        <h4>Employee ID: {{ employeeId }}</h4>
        <table class="table table-bordered table-hover table-striped mb-0">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in entries" :key="entry.id">
              <td>{{ entry.id }}</td>
              <td>{{ formatDate(entry.date) }}</td>
              <td>{{ entry.reason }}</td>
              <td>
                <span :class="badgeClass(entry.status)">{{ entry.status }}</span>
              </td>
              <td>
                
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteAttendance(entry.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendanceForm: {
        id: null,
        employeeId: "",
        date: "",
        reason: "",
        status: "",
      },
      isEdit: false,
    };
  },
  computed: {
    attendance() {
      return this.$store.state.attendance;
    },
    groupedAttendance() {
      if (!Array.isArray(this.attendance)) return {};
      return this.attendance.reduce((grouped, entry) => {
        if (!grouped[entry.employeeId]) {
          grouped[entry.employeeId] = [];
        }
        grouped[entry.employeeId].push(entry);
        return grouped;
      }, {});
    },
  },
  mounted() {
    this.$store.dispatch("getAttendance");
  },
  methods: {
    openAddModal() {
      this.isEdit = false;
      this.attendanceForm = {
        id: null,
        employeeId: "",
        date: "",
        reason: "",
        status: "",
      };
      const modal = new bootstrap.Modal(
        document.getElementById("attendanceModal")
      );
      modal.show();
    },
    formatDate(dateStr) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    badgeClass(status) {
      switch (status) {
        case "Approved":
          return "badge bg-success";
        case "Pending":
          return "badge bg-secondary";
        case "Denied":
          return "badge bg-danger";
        default:
          return "badge bg-secondary";
      }
    },
    submitAttendance() {
      const action = this.isEdit ? "updateAttendance" : "postAttendance";

      this.$store
        .dispatch(action, this.attendanceForm)
        .then(() => {
          this.$store.dispatch("getAttendance");
          this.attendanceForm = {
            id: null,
            employeeId: "",
            date: "",
            reason: "",
            status: "",
          };
          this.isEdit = false;
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("attendanceModal")
          );
          modal.hide();
        })
        .catch((err) => {
          console.error("Failed to submit attendance:", err);
          alert("Error while submitting attendance.");
        });
    },
    editAttendance(entry) {
      this.isEdit = true;
      this.attendanceForm = { ...entry };
      const modal = new bootstrap.Modal(
        document.getElementById("attendanceModal")
      );
      modal.show();
    },
    deleteAttendance(id) {
      if (confirm("Are you sure you want to delete this attendance?")) {
        this.$store
          .dispatch("deleteAttendance", id)
          .then(() => this.$store.dispatch("getAttendance"));
      }
    },
  },
};
</script>

<style scoped>
.btn{
  background: linear-gradient(135deg, #2C3E50, #4A6491);
  color: white;
  border: none;
  font-weight: 70;
  font-size: 14px;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  background: linear-gradient(135deg, #4A6491, #2C3E50);
}
/* Container for attendance cards in rows of 2 */
.attendance-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

/* Each card styling */
.attendance-group {
  background: linear-gradient(to right, #202088, #794a79);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  flex: 1 1 45%;
  min-width: 280px;
  color: #f0e9ff;
  overflow-x: auto;
  transition: transform 0.3s ease;
}
.attendance-group:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.attendance-group h4 {
  margin-bottom: 1rem;
  color: #dcd6f7;
}

/* Table inside the card */
.attendance-group table {
  background: transparent;
  color: inherit;
  margin-bottom: 0;
}

/* Header styling */
.attendance-group thead {
  background: rgba(0, 0, 0, 0.25);
  color: #e0d9ff;
}

/* Table cells styling */
.attendance-group td {
  background: rgba(255 255 255 / 0.1);
  color: #f0e9ff;
}

.btn.btn-sm.btn-primary {
  background: linear-gradient(to right, #2196f3, #64b5f6);
  border: none;
  color: white;
  transition: background 0.3s ease;
}

.btn.btn-sm.btn-primary:hover {
  background: linear-gradient(to right, #1976d2, #42a5f5);
}

/* Delete button gradient */
.btn.btn-sm.btn-danger {
  background: linear-gradient(to right, #f44336, #e57373);
  border: none;
  color: white;
  transition: background 0.3s ease;
}

.btn.btn-sm.btn-danger:hover {
  background: linear-gradient(to right, #d32f2f, #ef5350);
}

h2.mb-4.text-center {
  color: #e0e0e0; /* Light grey */
}


/* Responsive: full width cards on small screens */
@media (max-width: 768px) {
  .attendance-group {
    flex: 1 1 100%;
  }
}
</style>
