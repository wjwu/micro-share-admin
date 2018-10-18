import getSales from './getSales';

export default {
  namespaced: true,
  state: {
    ...getSales.state
  },
  mutations: {
    ...getSales.mutations
  },
  actions: {
    ...getSales.actions
  }
};
