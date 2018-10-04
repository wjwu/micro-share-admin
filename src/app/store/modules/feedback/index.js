import getFeedbacks from './getFeedbacks';
import getFeedback from './getFeedback';

export default {
  namespaced: true,
  state: {
    ...getFeedbacks.state,
    ...getFeedback.state
  },
  mutations: {
    ...getFeedbacks.mutations,
    ...getFeedback.mutations
  },
  actions: {
    ...getFeedbacks.actions,
    ...getFeedback.actions
  }
};
