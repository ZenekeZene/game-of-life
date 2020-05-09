import Vue from 'vue';
import App from './ui/components/App.vue';
import './registerServiceWorker';
import store from './adapter';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
