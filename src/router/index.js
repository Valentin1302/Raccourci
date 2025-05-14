import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import StatsView from '@/views/StatsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/visits/:shortCode',
    name: 'visits',
    component: StatsView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;