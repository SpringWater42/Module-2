<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
      {{ isEditing ? 'Edit Employee' : 'Add Employee' }}
    </button>

    <!-- Add/Edit Employee Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Employee' : 'Add Employee' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEmployee" class="form-container">
              <input type="text" v-model="employee.employee_id" placeholder="ID" required />
              <input type="text" v-model="employee.name" placeholder="Name" required />
              <input type="text" v-model="employee.position" placeholder="Position" required />
              <input type="text" v-model="employee.department" placeholder="Department" required />
              <input type="number" v-model="employee.salary" placeholder="Salary" required />
              <input type="text" v-model="employee.employmentHistory" placeholder="Employment History" required />
              <input type="text" v-model="employee.contact" placeholder="Contact" required />
              <input type="submit" :value="isEditing ? 'Update Employee' : 'Add Employee'" />
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee Detail Modal -->
    <div class="modal fade" id="employeeDetailModal" tabindex="-1" aria-labelledby="employeeDetailModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Employee Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedEmployee">
            <div class="employee-detail">
              <div class="detail-avatar">{{ selectedEmployee.name?.charAt(0) || '' }}</div>
              <h4>{{ selectedEmployee.name }}</h4>
              <div class="detail-row"><span class="detail-label">ID:</span> <span>{{ selectedEmployee.employee_id }}</span></div>
              <div class="detail-row"><span class="detail-label">Position:</span> <span>{{ selectedEmployee.position}}</span></div>
              <div class="detail-row"><span class="detail-label">Department:</span> <span>{{ selectedEmployee.department }}</span></div>
              <div class="detail-row"><span class="detail-label">Salary:</span> <span>R {{ selectedEmployee.salary }}</span></div>
              <div class="detail-row"><span class="detail-label">Employment History:</span> <span>{{ selectedEmployee.employmentHistory }}</span></div>
              <div class="detail-row"><span class="detail-label">Contact:</span> <span>{{ selectedEmployee.contact }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee Cards -->
    <div class="card-container">
      <div v-for="emp in employees" :key="emp.employee_id" class="employee-card">
        <div class="employee-avatar">{{ emp.name?.charAt(0) || '' }}</div>
        <h5 class="employee-name">{{ emp.name }}</h5>
        <p class="employee-position">Position: {{ emp.position_ }}</p>
        <p class="employee-department">Department: {{ emp.department }}</p>
        <p>Salary: R {{ emp.salary }}</p>
        <p>History: {{ emp.employmentHistory }}</p>
        <p>Contact: {{ emp.contact }}</p>
        <div class="action-buttons">
          <button @click="viewEmployee(emp)" class="btn-view">View</button>
          <button @click="editEmployee(emp)" class="btn-edit">Edit</button>
          <button @click="deleteEmployee(emp.employee_id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employee: {
        employee_id: '',
        name: '',
        position: '',
        department: '',
        salary: null,
        employmentHistory: '',
        contact: '',
      },
      isEditing: false,
      selectedEmployee: null,
    };
  },
  computed: {
    employees() {
      return this.$store.state.employees || [];
    },
  },
  mounted() {
    this.$store.dispatch('getEmployees');
  },
  methods: {
    submitEmployee() {
      const action = this.isEditing ? 'updateEmployee' : 'postEmployees';
      this.$store.dispatch(action, this.employee)
        .then(() => {
          alert(this.isEditing ? 'Employee updated!' : 'Employee added!');
          this.resetForm();
        })
        .catch((err) => {
          console.error('Error:', err);
          alert('Failed to save employee.');
        });
    },
    editEmployee(emp) {
      this.employee = { ...emp };
      this.isEditing = true;
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    },
    deleteEmployee(id) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.$store.dispatch('deleteEmployee', id).then(() => this.$store.dispatch('getEmployees'));
      }
    },
    resetForm() {
      this.employee = {
        employee_id: '',
        name: '',
        position: '',
        department: '',
        salary: null,
        employmentHistory: '',
        contact: '',
      };
      this.isEditing = false;
      this.$store.dispatch('getEmployees');
      const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
      if (modal) modal.hide();
    },
    viewEmployee(emp) {
      this.selectedEmployee = emp;
      const modal = new bootstrap.Modal(document.getElementById('employeeDetailModal'));
      modal.show();
    }
  }
};
</script>

<style scoped>
.btn{
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

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  background: linear-gradient(135deg, #4A6491, #2C3E50);
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.employee-card {
  background: linear-gradient(to right, #202088, #794a79);
  border-radius: 10px;
  padding: 15px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}

.employee-card:hover {
  transform: scale(1.05);
}

.employee-avatar {
  width: 60px;
  height: 60px;
  background: #fff;
  color: #202088;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.employee-name {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.employee-position,
.employee-department {
  margin: 4px 0;
  font-size: 0.95rem;
  text-align: center;
}

.action-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-view,
.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-view {
  background: linear-gradient(to right, #6c757d, #495057); /* grey gradient */
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.3s ease;
}

.btn-view:hover {
  background: linear-gradient(to right, #5a6268, #343a40);
  opacity: 0.9;
  transform: scale(1.05);
}


.btn-edit {
  background: linear-gradient(to right, #2196f3, #64b5f6);
  color: white;
}


.btn-delete {
  background: linear-gradient(to right, #f44336, #e57373);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-view:hover,
.btn-edit:hover,
.btn-delete:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* Modal - Employee Details */
.employee-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.detail-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(to right, #202088, #794A79);
  color: white;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.detail-label {
  font-weight: bold;
  color: #555;
}

/* Form styling inside modal */
.form-container input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.form-container input[type="submit"] {
  background-color: #202088;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.form-container input[type="submit"]:hover {
  opacity: 0.9;
}
</style>
