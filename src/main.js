import Vue from 'vue';
import App from './ui/components/app/App.vue';
import './registerServiceWorker';
import store from './adapter';
import '@/ui/assets/main.scss';
import '@zeneke/sloth-ui/lib/styles/main.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
