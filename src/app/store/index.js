import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import finance from './modules/finance';
import user from './modules/user';
import product from './modules/product';
import operation from './modules/operation';
import test from './modules/test';
import market from './modules/market';
import push from './modules/push';
import solution from './modules/solution';
import setup from './modules/setup';
import ad from './modules/ad';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    finance,
    user,
    product,
    operation,
    test,
    market,
    push,
    solution,
    setup,
    ad
  }
});
