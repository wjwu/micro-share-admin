import getGroups from './getGroups';
import getGroup from './getGroup';

export default {
  namespaced: true,
  state: {
    ...getGroups.state,
    ...getGroup.state
  },
  mutations: {
    ...getGroups.mutations,
    ...getGroup.mutations
  },
  actions: {
    ...getGroups.actions,
    ...getGroup.actions
  }
};
