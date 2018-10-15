import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    deleteNotice: {
      loading: false
    }
  },
  mutations: {
    requestDeleteNotice(state) {
      state.deleteNotice.loading = true;
    },
    successDeleteNotice(state) {
      state.deleteNotice.loading = false;
    },
    failureDeleteNotice(state) {
      state.deleteNotice.loading = false;
    }
  },
  actions: {
    deleteNotice({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestDeleteNotice');
          await axios.delete(`/admin/news/${params.id}`, params);
          commit('successDeleteNotice');
          dispatch('global/notifySuccess', '删除成功', { root: true });
          dispatch('getNotices', state.getNotices.params);
        },
        () => {
          commit('failureDeleteNotice');
        }
      );
    }
  }
};
