import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import 'animate.css';

import localstoragePlugin from './plugins/localstorage';
import eventBusPlugin from './plugins/eventBus';
import App from './App.vue';
import router from './routes';
import store from './store';

import './assets/sass/styles.scss';

Vue.config.productionTip = false;

Vue.use(vClickOutside);
Vue.use(eventBusPlugin);
Vue.use(localstoragePlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
