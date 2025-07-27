<template>
  <div class="user-management p-4">
    <!-- Add User Button -->
    <button
      type="button"
      class="btn btn-primary mb-3"
      data-bs-toggle="modal"
      data-bs-target="#userModal"
    >
      Add User +
    </button>

    <!-- Modal Form -->
    <div
      class="modal fade"
      id="userModal"
      tabindex="-1"
      aria-labelledby="userModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">Add New User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div class="modal-body">
            <form @submit.prevent="submitUser">
              <input
                v-model="user.id"
                type="text"
                placeholder="User ID"
                class="form-control mb-2"
                required
              />
              <input
                v-model="user.username"
                type="text"
                placeholder="Username"
                class="form-control mb-2"
                required
              />
              <input
                v-model="user.password"
                type="password"
                placeholder="Password"
                class="form-control mb-2"
                required
              />
              <input
                v-model="user.role"
                type="text"
                placeholder="Role (e.g. admin)"
                class="form-control mb-3"
                required
              />
              <input
                type="submit"
                value="Submit"
                class="btn btn-success w-100"
              />
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Display Table -->
    <div v-if="users.length" class="mt-4">
      <h4>Registered Users</h4>
      <table class="table table-bordered mt-2">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.username }}</td>
            <td>{{ u.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: "",
        username: "",
        password: "",
        role: "",
      },
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    async submitUser() {
      try {
        await this.$store.dispatch("postUser", this.user); // ✅ FIXED
        alert("User added successfully!");
        this.$store.dispatch("getUser"); // ✅ FIXED
        this.user = { id: "", username: "", password: "", role: "" };
        document.querySelector("#userModal .btn-close").click();
      } catch (err) {
        console.error("Error adding user:", err);
        alert("Failed to add user.");
      }
    },
  },
  mounted() {
    this.$store.dispatch("getUser"); // ✅ FIXED
  },
};
</script>


<style scoped>
.user-management {
  max-width: 800px;
  margin: auto;
}

.table {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
</style>
