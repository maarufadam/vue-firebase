import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '@/views/Index.vue';
import AddSmoothie from '@/views/AddSmoothie.vue';
import EditSmoothie from '@/views/EditSmoothie.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-smoothie',
    name: 'AddSmoothie',
    component: AddSmoothie
  },
  {
    path: '/edit-smoothie/:smoothie_slug',
    name: 'EditSmoothie',
    component: EditSmoothie
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
