<template>
  <div class="login-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister"> <!-- Changed to submit event -->
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required @blur="validateUsername"
          data-testid="username-input" />
        <span v-if="usernameError" class="error">{{ usernameError }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required @blur="validateEmail" data-testid="email-input" />
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required @blur="validatePassword"
          data-testid="password-input" />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <div class="button-group">
        <button type="submit" :disabled="!isFormValid" data-testid="register-btn">Register</button>
        <!-- Changed to type="submit" -->
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref(''); // Added username ref
const email = ref('');
const password = ref('');
const usernameError = ref(''); // Added username error ref
const emailError = ref('');
const passwordError = ref('');

const validateUsername = () => {
  if (!username.value) {
    usernameError.value = 'Username is required';
  } else if (username.value.toLowerCase() === 'peter') {
    usernameError.value = 'User with name \'peter\' is already registered';
  } else {
    usernameError.value = '';
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailRegex.test(email.value) ? '' : 'Invalid email format';
};

const validatePassword = () => {
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!password.value) {
    passwordError.value = '';
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters long';
  } else if (!specialCharRegex.test(password.value)) {
    passwordError.value = 'Password must contain at least one special character';
  } else {
    passwordError.value = '';
  }
};

const isFormValid = computed(() => {
  // Check the actual error refs *after* validation logic might have run
  return username.value && email.value && password.value &&
    usernameError.value === '' && emailError.value === '' && passwordError.value === '';
});

const handleRegister = () => {
  // Ensure form is valid before proceeding (though button state handles this)
  if (!isFormValid.value) return;

  // For now, we'll just redirect to the account page with the email
  // In a real app, you'd send username, email, password to your backend
  console.log('Registering user:', username.value, email.value); // Log registration attempt
  router.push({ path: '/account', query: { email: email.value, username: username.value } }); // Pass username too
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.8rem;
}
</style>