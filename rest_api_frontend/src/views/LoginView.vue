<template>
  <div class="logo-container">
    <div class="main-wrapper">
      <!-- Logo Side -->
    

      <!-- Form Side -->
      <div class="wrapper animate">
        <form @submit.prevent="log_in">
          <div class="form-header">
            <h1>Welcome To ModernTech Solutions</h1>
          </div>

          <div class="container">
            <label for="uname"><b>Username:</b></label>
            <input v-model="logIn.username" type="text" placeholder="Enter Username" name="uname" required />

            <label for="psw"><b>Password:</b></label>
            <input v-model="logIn.password" type="password" placeholder="Enter Password" name="psw" required />

            <button type="submit" class="loginbtn">Login</button><br />
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>

            <div class="signup-link">
              Don’t have an account?
              <a href="#" @click.prevent="showSignup = true">Create an Account</a>
            </div>
          </div>

          <!-- <div class="container bottom-container">
            <button type="button" class="cancelbtn">Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
          </div> -->
        </form>
      </div>
    </div>

    <!-- Signup Modal -->
    <div v-if="showSignup" class="signup-modal">
      <div class="signup-wrapper">
        <h2>Create an Account</h2>
        <form @submit.prevent="add_user">
          <label for="name"><b>Name:</b></label>
          <input v-model="newUser.full_name" type="text" placeholder="Full Name" required />

          <label for="username"><b>Username:</b></label>
          <input v-model="newUser.username" type="text" placeholder="Username" required />

          <label for="email"><b>Email:</b></label>
          <input v-model="newUser.email" type="email" placeholder="Email" required />

          <label for="password"><b>Password:</b></label>
          <input v-model="newUser.password" type="password" placeholder="Password" required />

          <label for="password"><b>Confirm Password:</b></label>
          <input v-model="conPassword" type="password" placeholder="Confirm Password" required />

          <button type="submit" class="loginbtn">Sign Up</button>
          <button type="button" class="cancelbtn" @click="showSignup = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showSignup: false,
      newUser: {
        full_name: '',
        username: '',
        email: '',
        password: '',
      },
      conPassword: '',

      logIn: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    add_user() {
      if (this.newUser.password !== this.conPassword) {
        alert("Passwords doesn't match.");
        return;
      }
      for (let user of this.$store.state.users) {
        if (this.newUser.username === user.username) {
          alert("Enter another username.");
          return;
        }
      }
      try {
        alert("New user has been added.");
        this.$store.dispatch('add_users', this.newUser)
        this.showSignup = false
      } catch (error) {
        console.log(error);
      }
    },
    async log_in() {
      // Try to find the user first
      const user = this.$store.state.users.find(u => u.username === this.logIn.username);

      if (!user) {
        alert("Username invalid. Try creating an account.");
        return;
      }

      // Now check password using Vuex action (assumed to return true/false)
      const isValid = await this.$store.dispatch('check_password', {password: this.logIn.password, hashPassword: user.password});
      console.log(isValid)

      if (isValid) {
        this.$router.push('/dashboard');
      } else {
        alert("Password invalid.");
      }
    }
  }
};

</script>

<style scoped>
.logo-container {
 
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-wrapper {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  width: 800px;
  max-width: 95%;
  animation: slideFadeIn 1s ease forwards;
}

/* Logo Side */
.side-logo {
  background-color: #0b2545;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 50%;
}

.main-logo {
  width: 100%;
  max-width: 250px;
  animation: bounceFadeIn 1.2s ease-in-out;
}

/* Form Side */
.wrapper {
  width: 50%;
  padding: 30px;
  background-color: #ffffff;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 22px;
  color: #0b2545;
}

form {
  padding: 0;
}

.container {
  padding: 0;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #0b2545;
  border-radius: 6px;
  box-sizing: border-box;
  transition: 0.3s;
}

input[type='text']:focus,
input[type='password']:focus {
  border-color: #8da9c4;
  outline: none;
}

button.loginbtn {
  background: linear-gradient(135deg, #0b2545, #8da9c4);
  color: #ffffff;
  padding: 12px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: 0.3s;
}

button.loginbtn:hover {
  background: linear-gradient(135deg, #8da9c4, #0b2545);
  transform: scale(1.02);
}

.cancelbtn {
  padding: 10px 20px;
  background-color: #e61a1a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

.cancelbtn:hover {
  background-color: #b71c1c;
}

input[type='checkbox'] {
  accent-color: #319227;
}

.bottom-container {
  background-color: #0b2545;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  margin-top: 20px;
  color: white;
}

span.psw a {
  color: white;
  text-decoration: underline;
}

@keyframes slideFadeIn {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-30px);
  }

  50% {
    opacity: 1;
    transform: scale(1.1) translateY(10px);
  }

  100% {
    transform: scale(1) translateY(0);
  }
}

/* Responsive Layout */
@media screen and (max-width: 768px) {
  .main-wrapper {
    flex-direction: column;
  }

  .wrapper,
  .side-logo {
    width: 100%;
  }

  .side-logo {
    padding: 20px;
  }

  .main-logo {
    max-width: 180px;
  }
}

/* Signup Modal Styles */
.signup-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(11, 37, 69, 0.85), rgba(141, 169, 196, 0.9));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  backdrop-filter: blur(6px);
}

.signup-wrapper {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  animation: slideFadeIn 0.6s ease forwards;
  font-family: 'Segoe UI', sans-serif;
}

.signup-wrapper h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #0b2545;
  font-size: 24px;
}

.signup-wrapper input {
  width: 100%;
  padding: 12px 14px;
  margin: 10px 0;
  border: 1px solid #8da9c4;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.signup-wrapper input:focus {
  border-color: #0b2545;
  box-shadow: 0 0 4px #0b2545;
  outline: none;
}

.signup-wrapper .loginbtn,
.signup-wrapper .cancelbtn {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.signup-wrapper .loginbtn {
  background: linear-gradient(135deg, #0b2545, #8da9c4);
  color: #ffffff;
}

.signup-wrapper .loginbtn:hover {
  background: linear-gradient(135deg, #092036, #6f8ca9);
  transform: scale(1.02);
}

.signup-wrapper .cancelbtn {
  background-color: #e74c3c;
  color: #ffffff;
}

.signup-wrapper .cancelbtn:hover {
  background-color: #c0392b;
  transform: scale(1.02);
}

/* Signup link */
.signup-link {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

.signup-link a {
  color: #0b2545;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.signup-link a:hover {
  text-decoration: none;
  color: #092036;
}

@media screen and (max-width: 768px) {
  .signup-wrapper {
    width: 90%;
    padding: 30px 20px;
  }
}
</style>