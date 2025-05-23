<template>
  <div class="container" data-testid="home-page">
    <h1 data-testid="home-title">Welcome to the Data Validator App</h1>
    <p data-testid="home-dummy">This is some dummy content for the home page.</p>
    <router-link to="/validate-data" data-testid="nav-validate-button">
      <button>Go to Validate Data</button>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Page-specific styles */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  /* Ensure it takes at least half the viewport height */
  text-align: center;
  /* Center text within the container */
}

h1 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 30px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
