<template>
  <div class="registration-container">
    <div class="registration-header">
      <h1 data-testid="page-title">User Registration</h1>
      <p class="subtitle">Create your account to get started</p>
    </div>

    <form @submit.prevent="handleRegistration" data-testid="registration-form" class="registration-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="reg-name">Name</label>
          <input data-testid="reg-name-input" id="reg-name" type="text" v-model="user.name"
            placeholder="Enter your name" required />
        </div>

        <div class="form-group">
          <label for="reg-email">Email</label>
          <input data-testid="reg-email-input" id="reg-email" type="email" v-model="user.email"
            placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label for="reg-role">Role</label>
          <select data-testid="reg-role-select" id="reg-role" v-model="user.role" required>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div class="form-group">
          <label for="reg-address">Address</label>
          <input data-testid="reg-address-input" id="reg-address" type="text" v-model="user.address"
            placeholder="Enter your address" required />
        </div>

        <div class="form-group interests-group">
          <label>Interests</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" value="technology" v-model="user.interests" data-testid="reg-interest-tech" />
              <span class="checkbox-text">Technology</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="design" v-model="user.interests" data-testid="reg-interest-design" />
              <span class="checkbox-text">Design</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="music" v-model="user.interests" data-testid="reg-interest-music" />
              <span class="checkbox-text">Music</span>
            </label>
          </div>
        </div>

        <div class="form-group subscription-group">
          <label>Subscription</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" value="monthly" v-model="user.subscription" data-testid="reg-subscription-monthly" />
              <span class="radio-text">Monthly</span>
            </label>
            <label class="radio-label">
              <input type="radio" value="yearly" v-model="user.subscription" data-testid="reg-subscription-yearly" />
              <span class="radio-text">Yearly</span>
            </label>
          </div>
        </div>

        <div class="form-group avatar-group">
          <label for="reg-avatar">Avatar</label>
          <div class="avatar-container">
            <div class="avatar-upload">
              <input type="file" id="reg-avatar" data-testid="reg-avatar-upload" accept="image/*"
                @change="handleFileUpload" />
              <label for="reg-avatar" class="avatar-button">Choose File</label>
              <span class="file-name">{{ user.avatar || 'No file chosen' }}</span>
            </div>
            <div class="avatar-preview" v-if="avatarURL">
              <img :src="avatarURL" alt="Avatar Preview" data-testid="reg-avatar-preview" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button data-testid="reg-submit-button" type="submit" class="submit-button">Register</button>
      </div>
    </form>

    <div data-testid="reg-result" class="result-card" v-if="registrationComplete">
      <h2>Registration Complete</h2>
      <div class="result-content">
        <div class="result-avatar">
          <img v-if="avatarURL" :src="avatarURL" alt="Avatar" />
          <div v-else class="avatar-placeholder">No Avatar</div>
        </div>
        <div class="result-details">
          <p data-testid="result-name"><strong>Name:</strong> {{ user.name }}</p>
          <p data-testid="result-email"><strong>Email:</strong> {{ user.email }}</p>
          <p data-testid="result-role"><strong>Role:</strong> {{ user.role }}</p>
          <p data-testid="result-interests"><strong>Interests:</strong> {{ user.interests.join(', ') || 'None selected'
          }}</p>
          <p data-testid="result-subscription"><strong>Subscription:</strong> {{ user.subscription || 'Not selected' }}
          </p>
          <p data-testid="result-address"><strong>Address:</strong> {{ user.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  name: '',
  email: '',
  role: '',
  interests: [],
  subscription: '',
  avatar: '',
  address: ''
});
const registrationComplete = ref(false);
const avatarURL = ref(null);

function handleRegistration() {
  // For demo purposes, assume registration is successful if all required fields are provided
  if (user.value.name && user.value.email && user.value.role && user.value.address) {
    registrationComplete.value = true;
    // Scroll to the result section
    setTimeout(() => {
      document.querySelector('.result-card')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    avatarURL.value = URL.createObjectURL(file);
    user.value.avatar = file.name; // Store file name for display purposes
  }
}
</script>

<style scoped>
.registration-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
}

.registration-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.registration-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #7d8a9a;
  margin-top: 0;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

input[type="text"],
input[type="email"],
select,
textarea {
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border 0.3s, box-shadow 0.3s;
  color: #4a5568;
  background-color: #f9fafc;
}

input[type="text"]:focus,
input[type="email"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

select {
  height: 50px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232c3e50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.checkbox-text,
.radio-text {
  margin-left: 0.5rem;
  font-weight: normal;
}

input[type="checkbox"],
input[type="radio"] {
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: #3498db;
}

.avatar-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.avatar-upload {
  flex: 1;
}

.avatar-upload input[type="file"] {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.avatar-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 1rem;
}

.avatar-button:hover {
  background-color: #2980b9;
}

.file-name {
  color: #7d8a9a;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 200px;
  vertical-align: middle;
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #dfe3e8;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.submit-button {
  padding: 1rem 3rem;
  background-color: #2980b9;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(41, 128, 185, 0.3);
}

.submit-button:hover {
  background-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(41, 128, 185, 0.4);
}

.submit-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(41, 128, 185, 0.3);
}

.result-card {
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f9fafc;
  border: 1px solid #dfe3e8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card h2 {
  color: #2c3e50;
  margin-top: 0;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 1rem;
}

.result-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.result-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #edf2f7;
  flex-shrink: 0;
}

.result-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #dfe3e8;
  color: #7d8a9a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.result-details {
  flex: 1;
  text-align: left;
}

.result-details p {
  margin: 0.7rem 0;
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
}

.result-details strong {
  color: #2c3e50;
  font-weight: 600;
  display: inline-block;
  width: 120px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .result-content {
    flex-direction: column;
    align-items: center;
  }

  .result-details {
    width: 100%;
  }

  .checkbox-group,
  .radio-group {
    flex-direction: column;
  }
}
</style>
