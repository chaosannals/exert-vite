import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import loader from './loader';

const app = createApp(App);
app.use(loader);
app.mount('#app');
