import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createMyDemoRouter } from './router';
import loader from './loader';

const app = createApp(App)
const router = createMyDemoRouter();
app.use(router);
app.use(loader);
app.mount('#app');
