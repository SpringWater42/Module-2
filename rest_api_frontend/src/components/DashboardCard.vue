<template>
  <div class="dashboard-card">
    <h5>{{ title }}</h5>
    <h1>{{ count }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    count: [Number, String]
  }
};
</script>

<style scoped>
.dashboard-card {
  background: linear-gradient(to right, #17a2b8, #6610f2);
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
}

.dashboard-card:hover {
  transform: scale(1.03);
}
</style>
