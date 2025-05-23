<template>
  <div class="page-container">
    <Header />
    <main class="main-content" data-testid="login-page">
      <section class="content-box">
        <h2 data-testid="login-title">Login</h2>
        <form @submit.prevent="handleLogin" data-testid="login-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input id="name" v-model="name" type="text" required data-testid="name-input" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input id="password" v-model="password" type="password" required data-testid="password-input" />
          </div>
          <button type="submit" class="btn btn-primary" data-testid="submit-button">Submit</button>
        </form>
        <div v-if="token" class="token-display" data-testid="token-display">
          <p>Login Successful! Your token:</p>
          <strong data-testid="token-value">{{ token }}</strong>
        </div>
        <div v-if="loginError" class="error-message" data-testid="error-message">
          <p>{{ loginError }}</p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

const name = ref('')
const password = ref('')
const token = ref('')
const loginError = ref('')

const handleLogin = async () => {
  loginError.value = '' // Clear previous errors
  token.value = '' // Clear previous token
  try {
    const res = await $fetch('/api/login', {
      method: 'POST',
      body: { name: name.value, password: password.value }
    })
    if (res.token) {
      token.value = res.token
    } else {
      loginError.value = res.message || 'Login failed. Please check your credentials.'
    }
  } catch (error) {
    console.error("Login error:", error)
    loginError.value = error.data?.message || 'An unexpected error occurred during login.'
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7f6;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically for login form */
}

.content-box {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 450px; /* Smaller box for login */
  text-align: center;
}

h2[data-testid="login-title"] {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box; /* Important for width 100% */
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  border: none;
  width: 100%; /* Make button full width of its container */
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.token-display {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #e9f7ef; /* Light green for success */
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  color: #155724;
  word-break: break-all; /* For long tokens */
}

.token-display p {
  margin: 0 0 0.5rem 0;
}

.token-display strong {
  font-family: 'Courier New', Courier, monospace; /* Monospace for token */
}

.error-message {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: #f8d7da; /* Light red for error */
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  color: #721c24;
}
</style>
