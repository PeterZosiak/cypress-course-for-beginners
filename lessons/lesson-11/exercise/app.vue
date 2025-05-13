<template>
  <div>
    <header>
      <Navigation />
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Navigation from '~/components/Navigation.vue';
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

header {
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
}

main {
  padding: 2rem;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
