import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../src/pages/HomePage.vue';
import PrivateInfoPage from '../src/pages/PrivateInfoPage.vue';
import ExperienceInfoPage from '../src/pages/ExperienceInfoPage.vue';
import EducationInfoPage from '../src/pages/EducationInfoPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/info/private', component: PrivateInfoPage },
    { path: '/info/experience', component: ExperienceInfoPage },
    { path: '/info/education', component: EducationInfoPage },
  ],
});

export default router;
