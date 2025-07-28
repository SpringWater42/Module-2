<template>
  <nav>
    <router-link to="/users">Dashboard</router-link> |
    <router-link to="/">Employees</router-link> |
    <router-link to="/about">Payslip</router-link> |
    <router-link to="/attend">Attendance</router-link> |
    <router-link to="/per">Performance</router-link> |

  </nav>
  <router-view/>
</template>

<script>
export default { 
  mounted() {
    this.$store.dispatch('getUsers')
  }
}

</script>





<style>
#app {
    background-image: url("./assets/main-background.jpg");
     background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 25px;
   background-color: rgb(61, 62, 62);
   border-radius: 1000px;
   border: #42b983;
}

nav a {
  font-size: 20px;
  font-weight: bold;
  color: #908c8c;
}

 nav :hover{
color: rgb(247, 248, 248);
background-color: rgb(27, 70, 73);
padding: 10px;
transition: 1s;
 }
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
