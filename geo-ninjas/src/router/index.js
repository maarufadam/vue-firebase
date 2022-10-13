import { createRouter, createWebHistory } from 'vue-router';
import GMap from '@/views/home/GMap.vue';
import SignUp from '@/views/auth/Signup.vue';
import Login from '@/views/auth/Login.vue';
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'GMap',
    component: GMap,
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.meta.requiredAuth) {
    // check the auth state of the user
    const auth = getAuth();
		let user = auth.currentUser;

    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      // no user signed in, redirect to login
      next({ name: 'Login'});
    }
  } else {
    next();
  }
});

export default router;