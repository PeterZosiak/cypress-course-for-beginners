<template>
  <div class="page-container">
    <Header />
    <main class="main-content" data-testid="home-page">
      <section class="content-box">
        <h2 data-testid="welcome-title">Welcome to My Nuxt App</h2>
        <p data-testid="welcome-text" class="subtitle">
          This is a beautifully styled home page. Explore and enjoy the modern look!
        </p>
        <NuxtLink to="/login" class="btn btn-primary" data-testid="login-link">Login</NuxtLink>

        <div class="search-section" data-testid="search-section">
          <input type="text" v-model="searchQuery" placeholder="Search articles..." data-testid="search-input" />
          <button @click="fetchArticles" class="btn btn-secondary" data-testid="search-button">Search</button>
        </div>

        <div class="articles-container" data-testid="articles-section" v-if="hasSearched">
          <h3 data-testid="articles-title">Articles</h3>
          <ul v-if="articles.length > 0" class="articles-list">
            <li v-for="article in articles" :key="article.id" :data-testid="`article-${article.id}`" class="article-item">
              <strong>{{ article.title }}</strong>
              <p>{{ article.content }}</p>
            </li>
          </ul>
          <p v-else data-testid="no-articles-found">No articles found for your search.</p>
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

const searchQuery = ref('')
const articles = ref([])
const hasSearched = ref(false)

const fetchArticles = async () => {
  const queryParam = searchQuery.value ? `?search=${encodeURIComponent(searchQuery.value)}` : ''
  try {
    articles.value = await $fetch(`/api/articles${queryParam}`)
  } catch (error) {
    console.error("Error fetching articles:", error);
    articles.value = []; // Ensure articles is an array on error
  }
  hasSearched.value = true
}
</script>

<style scoped>
/* General Page Structure */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f7f6; /* Light, modern background for the whole page */
}

.main-content {
  flex-grow: 1;
  padding: 2rem; /* Padding around the main content area */
  display: flex;
  justify-content: center; /* Center the content box */
}

.content-box {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 900px; /* Max width for the content box */
  text-align: center;
}

h2[data-testid="welcome-title"] {
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}

.subtitle {
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

/* Search Section */
.search-section {
  margin: 2.5rem 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.search-section input[type="text"] {
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  width: 300px;
  max-width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-section input[type="text"]:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

/* Buttons */
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
}

.btn-primary {
  background-color: #3498db;
  color: white;
  margin-right: 1rem; /* Spacing if next to another button */
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

/* Articles Section */
.articles-container {
  margin-top: 2.5rem;
  text-align: left;
}

.articles-container h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.articles-list {
  list-style: none;
  padding: 0;
}

.article-item {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.article-item strong {
  display: block;
  font-size: 1.2rem;
  color: #343a40;
  margin-bottom: 0.5rem;
}

.article-item p {
  font-size: 1rem;
  color: #495057;
  line-height: 1.6;
  margin: 0;
}

p[data-testid="no-articles-found"] {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin-top: 1rem;
}
</style>
