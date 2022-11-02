import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { createMyDemoRouter } from './router';
import loader from './loader';

const pinia = createPinia();
const app = createApp(App)
const router = createMyDemoRouter();
app.use(pinia);
app.use(router);
app.use(loader);
app.mount('#app');
