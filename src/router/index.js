import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OpinionsView from '../views/OpinionsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/opinions/:id',
    name: 'Opiniones',
    component: OpinionsView,
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'Home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
