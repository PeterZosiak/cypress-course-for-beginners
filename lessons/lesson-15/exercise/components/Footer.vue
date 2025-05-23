<template>
  <footer class="footer" data-testid="app-footer">
    <div class="footer-content">
      <p>&copy; {{ new Date().getFullYear() }} My Nuxt App. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa; /* Light gray, consistent with a clean theme */
  color: #6c757d; /* Softer text color */
  padding: 1.5rem 2rem; /* More padding */
  text-align: center;
  border-top: 1px solid #e0e0e0; /* Subtle top border */
  /* Removed fixed positioning to allow natural flow,
     will be at the bottom if content pushes it.
     If a sticky footer is absolutely needed with short content,
     flexbox on the main app layout is a better approach. */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
