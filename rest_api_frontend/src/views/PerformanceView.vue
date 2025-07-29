<template>
  <div class="performance-container">
    <h3>Performance Reviews</h3>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Add Performance +
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
<form @submit.prevent="submitPerformance">
  <input type="text" v-model="performanceForm.id" placeholder="performance ID" required />
  <input type="text" v-model="performanceForm.employeeId" placeholder="Employee ID" required />
  <input type="number" v-model="performanceForm.rating" placeholder="Rating" required />
  <input type="text" v-model="performanceForm.description" placeholder="Description" required />
  <input type="date" v-model="performanceForm.review_month" placeholder="Review Month" required />
  <input type="submit" value="Submit" />
</form>

        </div>
      </div>
    </div>
  </div>

  <br>
  <br>
    <div v-if="performance && performance.length" class="card-grid">
      <div v-for="item in performance" :key="item.id" class="performance-card">
        <div class="card-header">
          <div class="avatar">{{ item.id.toString().charAt(0) }}</div>
          <div class="card-info">
            <h4>ID: {{ item.id }}</h4>
            <p class="rating">Rating: {{ item.rating }}</p>
          </div>
        </div>

        <p class="description">{{ item.description }}</p>
        <p class="review-date">Review Month: {{ formatDate(item.review_month) }}</p>

        <div class="card-actions">
          <button class="btn edit" @click="editItem(item)">Edit</button>
          <button class="btn delete" @click="deleteItem(item.id)">Delete</button>
        </div>
      </div>
    </div>

    <p v-else>No performance data found.</p>
  </div>
</template>

<script>
export default {
  data() {
  return {
    performanceForm: {
      id: '',
      employeeId: '',
      rating: '',
      description: '',
      review_month: ''
    }
  };
},
  computed: {
    performance() {
      return this.$store.state.performance;
    }
  },
  mounted() {
    this.$store.dispatch('getPerformance');
  },
  methods: {
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
      submitPerformance() {
  this.$store.dispatch("postPerformance", this.performanceForm)
    .then(() => {
      alert("Performance added!");
      this.$store.dispatch('getPerformance');
      this.performanceForm = {
        id: '',
        employeeId: '',
        rating: '',
        description: '',
        review_month: ''
      };
    })
    .catch(err => {
      console.error("Error adding performance:", err);
      alert("Failed to add performance.");
    });
},
    editItem(item) {
      console.log("Edit clicked for:", item);
      // Implement edit logic
    },
   deleteItem(id) {
  if (confirm("Are you sure you want to delete this performance entry?")) {
    this.$store.dispatch("deletePerformance", id)
      .then(() => {
        alert("Performance deleted successfully.");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete performance.");
      })}}}};
</script>

<style>
.performance-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.performance-card {
  background: linear-gradient(to bottom right, #1f85c4, #403434);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.05),
    0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e1e1e1;
}

.performance-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.08),
    0 10px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  background: linear-gradient(to right, #4caf50, #81c784);
  color: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-info h4 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.card-info .rating {
  margin: 0.25rem 0 0;
  color: #ffffff;
  font-size: 0.95rem;
}

.description {
  margin: 1rem 0;
  font-size: 0.95rem;
  color: #d4d0d0;
  line-height: 1.5;
}

.review-date {
  font-size: 0.9rem;
  color: #e1dfdf;
  margin-bottom: 0.75rem;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.btn.edit {
  background: linear-gradient(to right, #2196f3, #64b5f6);
  color: white;
}

.btn.delete {
  background: linear-gradient(to right, #f44336, #e57373);
  color: white;
}

.btn:hover {
  filter: brightness(1.05);
  transform: scale(1.02);
}

</style>
