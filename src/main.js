import Vue from 'vue';
import 'animate.css';

import App from './App.vue';
import router from './routes';
import store from './store';

import './assets/sass/styles.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
