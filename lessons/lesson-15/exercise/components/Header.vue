<template>
  <header class="header" data-testid="app-header">
    <div class="header-content">
      <NuxtLink to="/" class="logo-link">
        <h1>My Nuxt App</h1>
      </NuxtLink>
      <nav>
        <NuxtLink to="/" data-testid="home-link">Home</NuxtLink>
        <NuxtLink to="/login" data-testid="login-link-header">Login</NuxtLink>
        <NuxtLink to="/orders" data-testid="orders-link-header">Orders</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #ffffff; /* Cleaner white background */
  padding: 1rem 2rem; /* More padding */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Softer shadow */
  border-bottom: 1px solid #e0e0e0; /* Subtle border */
}

.header-content {
  max-width: 1200px; /* Boxed layout for content */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  text-decoration: none;
  color: #2c3e50; /* Darker, modern text color */
}

.logo-link h1 {
  margin: 0;
  font-size: 1.8rem; /* Adjusted font size */
  font-weight: 600;
}

nav a {
  margin: 0 1.2rem; /* Increased margin */
  text-decoration: none;
  color: #555; /* Softer link color */
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #3498db; /* Modern blue for hover */
}

/* Active link style (NuxtLink adds 'router-link-active' or similar, check generated classes) */
nav a.router-link-exact-active {
  color: #3498db;
  font-weight: 700;
}

nav a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db;
}
</style>
