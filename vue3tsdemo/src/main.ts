import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { createMyDemoRouter } from './router';
import loader from './loader';
import { piniaPluginDemo } from './plugins/ppdemo';

const pinia = createPinia();
pinia.use(piniaPluginDemo);
const app = createApp(App);
const router = createMyDemoRouter();
app.use(pinia);
app.use(router);
app.use(loader);
app.mount('#app');
