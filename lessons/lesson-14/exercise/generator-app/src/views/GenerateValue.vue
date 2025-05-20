<template>
  <div class="container" data-testid="generate-page">
    <h1 data-testid="generate-title">Generate Value</h1>
    <div class="form-wrapper">
      <form @submit.prevent="handleConfirm" data-testid="generate-form" class="generate-form">
        <div class="form-group">
          <label for="input1">Input 1:</label>
          <input id="input1" data-testid="input1" v-model="input1" placeholder="Enter first value" required />
        </div>
        <button type="submit" data-testid="confirm-button" class="confirm-button">Confirm</button>
      </form>
    </div>
    <div v-if="randomizedResult" data-testid="result-display" class="result">
      <h2>Randomized Result</h2>
      <p data-testid="result-text">{{ randomizedResult }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Two-way bound values for the input fields
const input1 = ref('');
const randomizedResult = ref('');

// A simple function to "randomize" a value using a hardcoded key.
// For demonstration, we concatenate the value with a key and its reversed form.
function randomizeValue(value, key = '1234') {
  return value + '-' + key + '-' + value.split('').reverse().join('');
}

function handleConfirm() {
  // For demo, combine both inputs and randomize each individually
  const random1 = randomizeValue(input1.value);
  randomizedResult.value = `Result 1: ${random1}`;
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
  text-align: center;
}

h1[data-testid="generate-title"] {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 600;
}

.form-wrapper {
  margin-bottom: 2rem;
}

.generate-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
}

.form-group input {
  padding: 0.85rem 1rem;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #f9fafc;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
  /* A modern blue */
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.confirm-button {
  padding: 0.9rem 1.5rem;
  background-color: #3498db;
  /* Modern blue */
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.confirm-button:hover {
  background-color: #2980b9;
  /* Darker blue on hover */
  transform: translateY(-2px);
}

.confirm-button:active {
  background-color: #2471a3;
  transform: translateY(0);
}

.result {
  margin-top: 2.5rem;
  padding: 1.5rem;
  background-color: #f0f9ff;
  /* Light blue background */
  border: 1px solid #b3e0ff;
  /* Light blue border */
  border-radius: 8px;
  text-align: left;
  animation: fadeIn 0.5s ease-out;
}

.result h2 {
  color: #1e6091;
  /* Darker blue for result title */
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.result p[data-testid="result-text"] {
  color: #333;
  font-size: 1.1rem;
  line-height: 1.6;
  word-break: break-all;
  /* Ensure long results don't break layout */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
