import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import StatsView from '@/views/StatsView.vue';
import ShortLinkView from '@/views/ShortLinkView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView,
  }, 
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/visits/:shortCode',
    name: 'visits',
    component: ShortLinkView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;