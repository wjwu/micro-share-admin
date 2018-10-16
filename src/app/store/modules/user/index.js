import getUsers from './getUsers';
import getUser from './getUser';
import closeUserVip from './closeUserVip';
import openUserVip from './openUserVip';

export default {
  namespaced: true,
  state: {
    ...getUsers.state,
    ...getUser.state,
    ...closeUserVip.state,
    ...openUserVip.state
  },
  mutations: {
    ...getUsers.mutations,
    ...getUser.mutations,
    ...closeUserVip.mutations,
    ...openUserVip.mutations
  },
  actions: {
    ...getUsers.actions,
    ...getUser.actions,
    ...closeUserVip.actions,
    ...openUserVip.actions
  }
};
