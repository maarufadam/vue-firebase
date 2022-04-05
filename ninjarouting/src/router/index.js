import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ViewProfile from '@/components/ViewProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/profile/:user_id',
    name: 'ViewProfile',
    component: ViewProfile
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
