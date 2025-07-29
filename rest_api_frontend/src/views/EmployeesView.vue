<template>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 Add Employee +
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
  <form @submit.prevent="submitEmployee">
    <br>
    <input type="text" v-model="employee.employee_id" placeholder="ID" required />
    <br>
    <input type="text" v-model="employee.name" placeholder="Name" required />
    <br>
    <input type="text" v-model="employee.position" placeholder="Position" required />
    <br>
    <input type="text" v-model="employee.department" placeholder="Department" required />
    <br>
    <input type="number" v-model="employee.salary" placeholder="Salary" required />
    <br>
    <input type="text" v-model="employee.employmentHistory" placeholder="Employment History" required />
    <br>
    <input type="text" v-model="employee.contact" placeholder="Contact" required />
    <br>
    <input type="submit" value="Submit" />
  </form>

      </div>
    </div>
  </div>
</div>






  <div class="card-container">
    <div v-for="employee in employees" :key="employee.employee_id" class="employee-card">
      <div class="employee-avatar">{{ employee.name.charAt(0) }}</div>

      <p class="employee-employee_id">ID: {{ employee.employee_id }}</p>
      <h5 class="employee-name">{{ employee.name }}</h5>
      <p class="employee-position">Position: {{ employee.position_}}</p>
      <p class="employee-department">Department: {{ employee.department }}</p>
      <p class="employee-salary">Salary: R {{ employee.salary }}</p>
      <p class="employee-employmentHistory">History: {{ employee.employmentHistory }}</p>
      <p class="employee-contact">Contact: {{ employee.contact }}</p>

      <div class="action-buttons">
        <button class="btn-edit" @click="editEmployee(employee)">Edit</button>
       <button class="btn-delete" @click="deleteEmployee(employee.employee_id)">Delete</button>
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
        salary: '',
        employmentHistory: '',
        contact: ''
      },
      isEditing: false
    };
  },
  computed: {
    employees() {
      return this.$store.state.employees || []
      // return this.$store.state.employees;
    }
  },
  mounted() {
    this.$store.dispatch('getEmployees');
  },
  methods: {
submitEmployee() {
  if (this.isEditing) {
    // EDITING FLOW
    this.$store.dispatch('updateEmployee', this.employees)
      .then(() => {
        alert("Employee updated!");
        this.resetForm(); // Close modal & reset form
      })
      .catch(err => {
        console.error("Error updating employee:", err);
        alert("Failed to update employee.");
      });
  } else {
    // ADDING FLOW
    this.$store.dispatch("postEmployees", this.employee)
      .then(() => {
        alert("Employee added!");
        this.resetForm(); // Close modal & reset form
      })
      .catch(err => {
        console.error("Error adding employee:", err);
        alert("Failed to add employee.");
      });
  }
},


    editEmployee(employee) {
  this.employee = { ...employee };     // Pre-fill the form
  this.isEditing = true;               // Switch mode to editing

  // Open the Bootstrap modal
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
},

    deleteEmployee(employee_id) {
      if (confirm("Are you sure you want to delete this employee?")) {
        this.$store.dispatch('deleteEmployee', employee_id)
          .then(() => this.$store.dispatch('getEmployees'));
      }
    },

   resetForm() {
  this.employee = {
    employee_id: '',
    name: '',
    position: '',
    department: '',
    salary: '',
    employmentHistory: '',
    contact: ''
  };
  this.isEditing = false;
  this.$store.dispatch('getEmployees');

  const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
  modal.hide();
}
  }
};

</script>

<style scoped>
/* Your existing styles stay exactly the same */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.employee-card {
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

.employee-card:hover {
  transform: scale(1.05);
}

.employee-avatar {
  width: 50px;
  height: 50px;
  background: #fff;
  color: #202088;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.employee-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: center;
}

.employee-position,
.employee-department,
.employee-contact {
  margin: 4px 0;
  font-size: 0.95rem;
  text-align: center;
}

/* Action Buttons */
.action-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-edit {
  background-color: #ffc107;
  color: #000;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
}

.Adduser {
  background: linear-gradient(to right, #202088, #794a79);
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}

@media (max-width: 768px) {
  .employee-card {
    width: 90%;
  }
}
</style>
