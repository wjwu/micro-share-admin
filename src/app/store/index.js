import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import ad from './modules/ad';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    ad
  }
});
