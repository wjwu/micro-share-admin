import getNotices from './getNotices';
import getNotice from './getNotice';
import addNotice from './addNotice';
import deleteNotice from './deleteNotice';
import updateNotice from './updateNotice';

export default {
  namespaced: true,
  state: {
    ...getNotices.state,
    ...getNotice.state,
    ...addNotice.state,
    ...deleteNotice.state,
    ...updateNotice.state
  },
  mutations: {
    ...getNotices.mutations,
    ...getNotice.mutations,
    ...addNotice.mutations,
    ...deleteNotice.mutations,
    ...updateNotice.mutations
  },
  actions: {
    ...getNotices.actions,
    ...getNotice.actions,
    ...addNotice.actions,
    ...deleteNotice.actions,
    ...updateNotice.actions
  }
};
