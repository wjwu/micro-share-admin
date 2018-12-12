import getShops from './getShops';
import getOrders from './getOrders';

export default {
  namespaced: true,
  state: {
    ...getShops.state,
    ...getOrders.state
  },
  mutations: {
    ...getShops.mutations,
    ...getOrders.mutations
  },
  actions: {
    ...getShops.actions,
    ...getOrders.actions
  }
};
