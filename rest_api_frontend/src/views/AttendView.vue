<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Attendance Records</h2>

    <!-- Add Attendance Button -->
    <div class="text-center mb-4">
      <button class="btn btn-success" @click="addRecord">Add Attendance</button>
    </div>

    <div v-for="(records, employeeId) in groupedAttendance" :key="employeeId" class="mb-5">
      <h4 class="text-primary">Employee ID: {{ employeeId }}</h4>
      <table class="table table-bordered table-hover table-striped">
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
          <tr v-for="record in records" :key="record.id">
            <td>{{ record.id }}</td>
            <td>{{ formatDate(record.date) }}</td>
            <td>{{ record.reason }}</td>
            <td>
              <span :class="badgeClass(record.status)">{{ record.status }}</span>
            </td>
            <td>
              <button class="btn btn-sm btn-primary me-2" @click="editRecord(record)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteRecord(record.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    attendance() {
      return this.$store.state.attendance;
    },
    groupedAttendance() {
      return this.attendance.reduce((grouped, entry) => {
        if (!grouped[entry.employeeId]) {
          grouped[entry.employeeId] = [];
        }
        grouped[entry.employeeId].push(entry);
        return grouped;
      }, {});
    }
  },
  mounted() {
    this.$store.dispatch('getAttendance');
  },
  methods: {
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    badgeClass(status) {
      switch (status) {
        case 'Approved':
          return 'badge bg-success';
        case 'Pending':
          return 'badge bg-warning text-dark';
        case 'Denied':
          return 'badge bg-danger';
        default:
          return 'badge bg-secondary';
      }
    },
    addRecord() {
      console.log('Add attendance clicked');
      // TODO: Implement add logic here (open form/modal)
    },
    editRecord(record) {
      console.log('Edit record:', record);
      // TODO: Implement edit logic here (open form/modal)
    },
    deleteRecord(id) {
      console.log('Delete record with ID:', id);
      // TODO: Implement delete logic here (confirmation + API call)
    }
  }
};
</script>

<style scoped>
h4 {
  margin-bottom: 1rem;
}
</style>
