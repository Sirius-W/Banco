import './assets/main.css'
import { createApp } from 'vue'

import axios from 'axios';
//import App  from './components/Registro.vue'
import App  from './components/pruebas.vue'
//import App  from './components/timbrado.vue'

const app = createApp(App);
app.config.globalProperties.$axios = axios; // Hacer Axios accesible globalmente
app.mount('#app');
