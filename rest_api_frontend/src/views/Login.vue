<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="login-container d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">Login</button>
        <button type="button" class="login-btn secondary" @click="handleSignUp">Sign Up</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      try {
        const res = await fetch("http://localhost:9090/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const data = await res.json();
        if (!res.ok) {
          this.error = data.message || "Login failed";
        } else {
          this.$store.commit("setUserLoggedIn", true);
          this.$router.push("/dashboard");
        }
      } catch (err) {
        this.error = "Server error. Please try again.";
      }
    },

    async handleSignUp() {
      this.error = "";

      if (!this.email || !this.password) {
        this.error = "Please enter email and password to sign up";
        return;
      }

      try {
        const res = await fetch("http://localhost:9090/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const data = await res.json();
        if (!res.ok) {
          this.error = data.message || "Sign up failed";
        } else {
          alert("Sign up successful! You can now log in.");
          this.email = "";
          this.password = "";
        }
      } catch (err) {
        this.error = "Server error during sign up. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 340px;
  width: 100%;
  padding: 28px;
  background-color: #f0f0f0;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4c4cbb;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #3b3ba8;
}
button.secondary {
  margin-top: 10px; 
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
