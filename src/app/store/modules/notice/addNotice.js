import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    addNotice: {
      loading: false
    }
  },
  mutations: {
    requestAddNotice(state) {
      state.addNotice.loading = true;
    },
    successAddNotice(state) {
      state.addNotice.loading = false;
    },
    failureAddNotice(state) {
      state.addNotice.loading = false;
    }
  },
  actions: {
    addNotice({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestAddNotice');
          await axios.post('/admin/news/', params);
          commit('successAddNotice');
          dispatch('global/notifySuccess', '发布成功', { root: true });
          dispatch('getNotices', state.getNotices.params);
        },
        () => {
          commit('failureAddNotice');
        }
      );
    }
  }
};
