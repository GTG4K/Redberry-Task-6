import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../src/pages/HomePage.vue';
import PrivateInfoPage from '../src/pages/PrivateInfoPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/info/private', component: PrivateInfoPage },
  ],
});

export default router;
