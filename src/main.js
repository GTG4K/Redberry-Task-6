import { createApp } from 'vue';
import router from './router.js';
import './style.css';
import App from './App.vue';

import BaseButton from './components/base/BaseButton.vue';
import BaseText from './components/base/BaseText.vue';
import BaseTextarea from './components/base/BaseTextarea.vue';
import BaseFile from './components/base/BaseFile.vue';
import BaseDate from './components/base/BaseDate.vue';
import BaseSelect from './components/base/BaseSelect.vue';

//resume
import ResumeContainer from './components/ui/ResumeContainer.vue';

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-text', BaseText);
app.component('base-file', BaseFile);
app.component('base-date', BaseDate);
app.component('base-select', BaseSelect);
app.component('base-textarea', BaseTextarea);
app.component('resume-container', ResumeContainer);

app.use(router);
app.mount('#app');
