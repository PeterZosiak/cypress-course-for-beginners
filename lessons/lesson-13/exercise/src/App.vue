<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
/* Global styles for App.vue */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  /* Ensure the app takes up at least the full height of the viewport */
}

.content {
  flex: 1;
  /* Allow the content to grow and fill the available space */
  display: flex;
  justify-content: center;
  /* Center content horizontally */
  align-items: center;
  /* Center content vertically */
  padding: 20px;
  max-width: 1200px;
  /* Limit the width of the content */
  margin: 0 auto;
  /* Center the content horizontally */
  width: 100%;
}
</style>
