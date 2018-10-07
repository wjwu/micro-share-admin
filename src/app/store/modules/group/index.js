import getGroups from './getGroups';
import getGroup from './getGroup';
import updateGroup from './updateGroup';

export default {
  namespaced: true,
  state: {
    ...getGroups.state,
    ...getGroup.state,
    ...updateGroup.state
  },
  mutations: {
    ...getGroups.mutations,
    ...getGroup.mutations,
    ...updateGroup.mutations
  },
  actions: {
    ...getGroups.actions,
    ...getGroup.actions,
    ...updateGroup.actions
  }
};
