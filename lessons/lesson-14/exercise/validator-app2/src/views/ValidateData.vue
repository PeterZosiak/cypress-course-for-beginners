<template>
  <div class="container" data-testid="validate-page">
    <h1 data-testid="validate-title">Validate Data</h1>
    <form @submit.prevent="handleVerify" data-testid="validate-form" class="validate-form">
      <div class="form-group">
        <label for="validate-input">Enter Value:</label>
        <input id="validate-input-1" data-testid="validate-input-1" v-model="inputValue1" placeholder="Enter a value"
          required />
          <input id="validate-input-2" data-testid="validate-input-2" v-model="inputValue2" placeholder="Enter a value"
          required />
          <input id="validate-input-3" data-testid="validate-input-3" v-model="inputValue3" placeholder="Enter a value"
          required />
      </div>
      <button type="submit" data-testid="verify-button" class="verify-button">Verify</button>
    </form>
    <div v-if="verifiedValue" data-testid="verified-display" class="result">
      <h2>Verified Value</h2>
      <p data-testid="verified-text">{{ verifiedValue }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const verifiedValue = ref('');

function handleVerify() {
  // For demo purposes, simply display the entered value.
  // In a real app, this would involve some validation logic.
  if (inputValue.value.trim() !== '') {
    verifiedValue.value = `Verified: ${inputValue.value}`;
  } else {
    verifiedValue.value = 'Input cannot be empty for verification.';
  }
}
</script>

<style scoped>
/* Page-specific styles */
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2.5rem;
  /* Increased padding */
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* Softer shadow */
  text-align: center;
}

h1[data-testid="validate-title"] {
  color: #333;
  /* Darker, more modern text color */
  margin-bottom: 2.5rem;
  font-size: 2.4rem;
  /* Slightly larger title */
  font-weight: 600;
}

.validate-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  /* Increased gap */
  margin-bottom: 2.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 0.6rem;
  /* Slightly more space */
  font-weight: 500;
  color: #555;
  /* Softer label color */
  font-size: 1rem;
}

.form-group input {
  padding: 0.9rem 1.1rem;
  /* Adjusted padding */
  border: 1px solid #ccc;
  /* Lighter border */
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #f8f9fa;
  /* Very light background */
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  /* Bootstrap primary blue */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  /* Bootstrap focus shadow */
}

.verify-button {
  padding: 0.9rem 1.5rem;
  background-color: #28a745;
  /* Bootstrap success green */
  color: white;
  font-size: 1.05rem;
  /* Slightly larger button text */
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
  /* Softer button shadow */
}

.verify-button:hover {
  background-color: #218838;
  /* Darker green on hover */
  transform: translateY(-2px);
}

.verify-button:active {
  background-color: #1e7e34;
  transform: translateY(0);
}

.result {
  margin-top: 2.5rem;
  padding: 1.8rem;
  /* Adjusted padding */
  background-color: #e9f7ef;
  /* Light green background for success */
  border: 1px solid #c3e6cb;
  /* Green border */
  border-radius: 8px;
  text-align: left;
  animation: fadeInScale 0.5s ease-out;
  /* Added scale effect */
}

.result h2 {
  color: #155724;
  /* Dark green for result title */
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  /* Slightly larger result title */
}

.result p[data-testid="verified-text"] {
  color: #0c5460;
  /* Darker text for result content */
  font-size: 1.1rem;
  line-height: 1.7;
  /* Increased line height */
  word-break: break-all;
}

@keyframes fadeInScale {

  /* New animation */
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
