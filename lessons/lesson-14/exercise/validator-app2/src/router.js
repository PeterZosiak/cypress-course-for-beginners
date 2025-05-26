import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ValidateData from './views/ValidateData.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/validate-data', name: 'ValidateData', component: ValidateData }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
