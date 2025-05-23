<template>
  <div class="page-container">
    <Header />
    <main class="main-content" data-testid="orders-page">
      <section class="content-box">
        <h2 data-testid="orders-title">Your Orders</h2>
        <div class="search-section" data-testid="search-section">
          <input type="text" v-model="searchQuery" placeholder="Search orders by item or ID..." data-testid="search-input" />
          <button class="btn btn-secondary" @click="fetchOrders" data-testid="search-button">Search</button>
        </div>

        <div v-if="loading" class="loading-indicator" data-testid="loading-indicator">
          <p>Loading orders...</p>
        </div>

        <div v-if="fetchError" class="error-message" data-testid="fetch-error-message">
          <p>{{ fetchError }}</p>
        </div>

        <div class="orders-list-container" data-testid="orders-list" v-if="!loading && !fetchError && orders.length > 0">
          <ul>
            <li v-for="order in orders" :key="order.id" :data-testid="`order-${order.id}`" class="order-item">
              <div class="order-id"><strong>Order ID:</strong> {{ order.id }}</div>
              <div class="order-details">
                <p><strong>Item:</strong> {{ order.item }}</p>
                <p><strong>Quantity:</strong> {{ order.quantity }}</p>
                <p><strong>Status:</strong> <span :class="`status status-${order.status?.toLowerCase()}`">{{ order.status || 'N/A' }}</span></p>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="!loading && !fetchError && orders.length === 0 && hasSearched" class="no-orders-message" data-testid="no-orders-message">
          <p>No orders found matching your criteria.</p>
        </div>
         <div v-if="!loading && !fetchError && orders.length === 0 && !hasSearched" class="no-orders-message" data-testid="initial-no-orders-message">
          <p>Enter a search term or click search to view orders.</p>
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
const orders = ref([])
const loading = ref(false)
const fetchError = ref('')
const hasSearched = ref(false) // To differentiate initial state from no results

const fetchOrders = async () => {
  loading.value = true
  fetchError.value = ''
  hasSearched.value = true
  const queryParam = searchQuery.value ? `?search=${encodeURIComponent(searchQuery.value)}` : ''
  try {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const fetchedData = await $fetch(`/api/orders${queryParam}`, {
      headers: {
        Authorization: 'Bearer my-secret-token' // Replace with actual token management
      }
    })
    orders.value = fetchedData || [] // Ensure orders is an array
  } catch (error) {
    console.error('Error fetching orders:', error)
    orders.value = []
    if (error.response && error.response.status === 401) {
        fetchError.value = 'Unauthorized: You do not have permission to view orders. Please login.';
    } else if (error.response && error.response.status === 403) {
        fetchError.value = 'Forbidden: You are not allowed to access these orders.';
    }
    else {
        fetchError.value = 'Failed to fetch orders. Please try again later.'
    }
  } finally {
    loading.value = false
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
}

.content-box {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 900px;
  text-align: center;
}

h2[data-testid="orders-title"] {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.search-section {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.search-section input[type="text"] {
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  width: 350px;
  max-width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-section input[type="text"]:focus {
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
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.loading-indicator,
.no-orders-message,
.error-message {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.loading-indicator p {
  color: #495057;
  font-size: 1.1rem;
}
.error-message {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.no-orders-message p {
  color: #6c757d;
  font-style: italic;
  font-size: 1.1rem;
}

.orders-list-container ul {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
}

.order-item {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.order-id {
  font-size: 1.1rem;
  color: #343a40;
  margin-bottom: 0.75rem;
}

.order-details p {
  margin: 0.4rem 0;
  font-size: 1rem;
  color: #495057;
}

.order-details strong {
  color: #343a40;
}

.status {
  padding: 0.25rem 0.6rem;
  border-radius: 12px; /* Pill shape */
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending {
  background-color: #fff3cd; /* Light yellow */
  color: #856404;
}

.status-shipped {
  background-color: #d1ecf1; /* Light blue */
  color: #0c5460;
}

.status-delivered {
  background-color: #d4edda; /* Light green */
  color: #155724;
}

.status-cancelled {
  background-color: #f8d7da; /* Light red */
  color: #721c24;
}
</style>
