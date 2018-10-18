import getUsers from './getUsers';
import getUser from './getUser';
import closeUserVip from './closeUserVip';
import openUserVip from './openUserVip';
import getCount from './getCount';

export default {
  namespaced: true,
  state: {
    ...getUsers.state,
    ...getUser.state,
    ...closeUserVip.state,
    ...openUserVip.state,
    ...getCount.state
  },
  mutations: {
    ...getUsers.mutations,
    ...getUser.mutations,
    ...closeUserVip.mutations,
    ...openUserVip.mutations,
    ...getCount.mutations
  },
  actions: {
    ...getUsers.actions,
    ...getUser.actions,
    ...closeUserVip.actions,
    ...openUserVip.actions,
    ...getCount.actions
  }
};
