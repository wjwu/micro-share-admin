import getUsers from './getUsers';
import getUser from './getUser';

export default {
  namespaced: true,
  state: {
    ...getUsers.state,
    ...getUser.state
  },
  mutations: {
    ...getUsers.mutations,
    ...getUser.mutations
  },
  actions: {
    ...getUsers.actions,
    ...getUser.actions
  }
};
