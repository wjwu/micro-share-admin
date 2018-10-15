import getFeedbacks from './getFeedbacks';
import getFeedback from './getFeedback';
import refuseFeedback from './refuseFeedback';
import acceptFeedback from './acceptFeedback';

export default {
  namespaced: true,
  state: {
    ...getFeedbacks.state,
    ...getFeedback.state,
    ...refuseFeedback.state,
    ...acceptFeedback.state
  },
  mutations: {
    ...getFeedbacks.mutations,
    ...getFeedback.mutations,
    ...refuseFeedback.mutations,
    ...acceptFeedback.mutations
  },
  actions: {
    ...getFeedbacks.actions,
    ...getFeedback.actions,
    ...refuseFeedback.actions,
    ...acceptFeedback.actions
  }
};
