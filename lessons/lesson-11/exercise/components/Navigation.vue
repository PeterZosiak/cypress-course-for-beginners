<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/" data-testid="nav-home">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/courses" data-testid="nav-courses">Courses</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" data-testid="nav-about">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact" data-testid="nav-contact">Contact</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login" data-testid="nav-login">Login</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/register" data-testid="nav-register">Register</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// No additional script needed for this simple component
</script>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 1rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}
</style>