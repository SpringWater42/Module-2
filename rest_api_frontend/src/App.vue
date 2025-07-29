<template>


  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
<div class="app-header">
  <img src="@/assets/logo.png" alt="Logo" class="app-logo" />
  <h2 class="app-title">ModernTech Solutions</h2>
</div>


      <!-- Toggler button for small screens -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible navbar content -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dashboard</router-link>
          </li>
          <li class="nav-item">
           <router-link class="nav-link" to="/employees">Employees</router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/payroll">PayRoll</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/attendance">Attendance</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/performance">Performance</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
     <Navbar />
</template>

<script>

import Navbar from './components/Navbar.vue';

export default { 
components: {
 Navbar,
},
}

</script>





<style>

#app {
 background-image: url(assets/main-background.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px; /* spacing between logo and title */
  padding: 10px 20px;
}

.app-logo {
  height: 40px;
  width: 50px;
  object-fit: contain;
}

.app-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #d5caca;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.navbar-nav .nav-link {
  position: relative;
  color: #ffffff;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #0d6efd;
}

/* Underline effect on hover */
.navbar-nav .nav-link::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  left: 0;
  bottom: 0;
  background-color: #0d6efd;
  transition: width 0.3s ease;
}

.navbar-nav .nav-link:hover::after {
  width: 100%;
}

.navbar .nav-link.router-link-exact-active {
  color: #0d6efd;
  font-weight: bold;
}
</style>
