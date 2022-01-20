import { createApp } from 'vue'
import App from './App.vue'
import FunCell from './funcell.js';
import ListItem from './listitem.js';
import ListBox from './listbox.vue';

const app = createApp(App);
app.component('ev-funcell', FunCell);
app.component('ev-listitem', ListItem);
app.component('ev-listbox', ListBox);
app.mount('#app');
