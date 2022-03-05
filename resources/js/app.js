require('./bootstrap');

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

window.axios = require('axios');

import { createApp } from 'vue';

import Container from './components/Container.vue';

const app = createApp({
    components:{
    	'container': Container,
    	}
 }).mount('#app');