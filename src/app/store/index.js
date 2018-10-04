import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import user from './modules/user';
import group from './modules/group';
import order from './modules/order';
import complaint from './modules/complaint';
import feedback from './modules/feedback';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    user,
    group,
    order,
    complaint,
    feedback
  }
});
