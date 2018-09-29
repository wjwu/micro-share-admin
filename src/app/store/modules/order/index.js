import getOrders from './getOrders';
import getOrder from './getOrder';

export default {
  namespaced: true,
  state: {
    ...getOrders.state,
    ...getOrder.state
  },
  mutations: {
    ...getOrders.mutations,
    ...getOrder.mutations
  },
  actions: {
    ...getOrders.actions,
    ...getOrder.actions
  }
};
