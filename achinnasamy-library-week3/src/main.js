import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
//import './assets/main.css'

//import './components/style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
const app = createApp(App);
app.use(PrimeVue, { theme: Aura });
app.component('DataTable', DataTable);
app.component('Column', Column);

app.mount('#app')

// createApp(App).mount('#app')
