import getItems from './getItems';

export default {
  namespaced: true,
  state: {
    ...getItems.state
  },
  mutations: {
    ...getItems.mutations
  },
  actions: {
    ...getItems.actions
  }
};
