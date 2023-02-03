import { createApp } from 'vue';
import router from './router.js';
import './style.css';
import App from './App.vue';

import BaseButton from './components/base/BaseButton.vue';
import BaseText from './components/base/BaseText.vue';
import BaseTextarea from './components/base/BaseTextarea.vue';
import BaseFile from './components/base/BaseFile.vue';

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-text', BaseText);
app.component('base-file', BaseFile);
app.component('base-textarea', BaseTextarea);
app.use(router);
app.mount('#app');
