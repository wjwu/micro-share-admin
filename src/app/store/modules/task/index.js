import getTasks from './getTasks';

export default {
  namespaced: true,
  state: {
    ...getTasks.state
  },
  mutations: {
    ...getTasks.mutations
  },
  actions: {
    ...getTasks.actions
  }
};
