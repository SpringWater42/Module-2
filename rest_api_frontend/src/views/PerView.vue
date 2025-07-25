<template>
  <div class="performance-container">
    <h3>Performance Reviews</h3>

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
  computed: {
    performance() {
      return this.$store.state.performance.performance;
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
    editItem(item) {
      console.log("Edit clicked for:", item);
      // Implement edit logic
    },
    deleteItem(id) {
      console.log("Delete clicked for ID:", id);
      // Implement delete logic
    }
  }
}
</script>

<style>
.performance-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.performance-card {
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 1rem;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 4px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.performance-card:hover {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.avatar {
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 0.75rem;
}

.card-info h4 {
  margin: 0;
  font-size: 1.1rem;
}

.card-info .rating {
  margin: 0.25rem 0 0;
  color: #777;
  font-size: 0.95rem;
}

.description {
  margin: 0.75rem 0;
  font-size: 0.95rem;
  color: #333;
}

.review-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.btn.edit {
  background-color: #2196F3;
  color: white;
}

.btn.delete {
  background-color: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
