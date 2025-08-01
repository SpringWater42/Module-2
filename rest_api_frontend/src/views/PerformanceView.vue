<template>
  <div class="performance-container">
    <h3>Performance Reviews</h3>

    <button type="button" class="btn btn-primary rounded-5 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
      {{ isEditing ? 'Edit Performance' : 'Add Performance' }}
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitPerformance">
              <input type="text" v-model="performanceForm.employeeId" placeholder="Employee ID" required />
              <input type="number" v-model.number="performanceForm.rating" placeholder="Rating" required />
              <input type="text" v-model="performanceForm.description" placeholder="Description" required />
              <input type="date" v-model="performanceForm.review_month" placeholder="Review Month" required />
              <input 
                type="submit" 
                :value="isEditing ? 'Update' : 'Submit'" 
                class="btn btn-success mt-2" 
              />
            </form>
          </div>
        </div>
      </div>
    </div>

    <br /><br />

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
        id: null,
        employeeId: '',
        rating: null,
        description: '',
        review_month: ''
      },
      isEditing: false
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
      const payload = {
        employeeId: Number(this.performanceForm.employeeId),
        rating: Number(this.performanceForm.rating),
        description: this.performanceForm.description,
        review_month: this.performanceForm.review_month
      };

      if (this.isEditing) {
        payload.id = this.performanceForm.id;
        this.$store.dispatch('updatePerformance', payload)
          .then(() => {
            alert('Performance updated!');
            this.resetForm();
            this.$store.dispatch('getPerformance');
            this.isEditing = false;
            this.closeModal();
          })
          .catch(err => {
            console.error('Error updating performance:', err);
            alert('Failed to update performance.');
          });
      } else {
        this.$store.dispatch('postPerformance', payload)
          .then(() => {
            alert('Performance added!');
            this.resetForm();
            this.$store.dispatch('getPerformance');
            this.closeModal();
          })
          .catch(err => {
            console.error('Error adding performance:', err);
            alert('Failed to add performance.');
          });
      }
    },
    editItem(item) {
      this.performanceForm = {
        id: item.id,
        employeeId: item.employeeId.toString(),
        rating: item.rating,
        description: item.description,
        review_month: item.review_month ? item.review_month.slice(0, 10) : ''
      };
      this.isEditing = true;

      // Open the modal programmatically
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
    },
    deleteItem(id) {
      if (confirm('Are you sure you want to delete this performance entry?')) {
        this.$store.dispatch('deletePerformance', id)
          .then(() => {
            alert('Performance deleted successfully.');
            this.$store.dispatch('getPerformance');
          })
          .catch(err => {
            console.error('Delete failed:', err);
            alert('Failed to delete performance.');
          });
      }
    },
    resetForm() {
      this.performanceForm = {
        id: null,
        employeeId: '',
        rating: null,
        description: '',
        review_month: ''
      };
      this.isEditing = false;
    },
    closeModal() {
      // Close modal programmatically
      const modalElement = document.getElementById('exampleModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
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

.performance-container h3 {
  color: #dcd6f7;
  font-weight: 600;
}

/* Your styles remain unchanged */
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
  background: linear-gradient(to right, #202088, #794a79);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.05),
    0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
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
  background: #fff;
  color: #202088;
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

.btn.delete {
  background: linear-gradient(to right, #f44336, #e57373);
  color: white;
  text-align: center;
  justify-content: center;
}

.btn:hover {
  filter: brightness(1.05);
  transform: scale(1.02);
}
</style>
