import '../common/css/reset.css';
import '../common/css/common.css';
import './assets/css/app.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './modules/route';
import store from './store';
import ElementUI from 'element-ui';
import '../common/css/theme-chalk/src/index.scss';
import './utils/axios';
import './filters';

Vue.config.productionTip = false;

Vue.use(ElementUI);

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

Vue.use({ app });
