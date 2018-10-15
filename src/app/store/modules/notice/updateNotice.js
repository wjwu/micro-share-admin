import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    updateNotice: {
      loading: false
    }
  },
  mutations: {
    requestUpdateNotice(state) {
      state.updateNotice.loading = true;
    },
    successUpdateNotice(state) {
      state.updateNotice.loading = false;
    },
    failureUpdateNotice(state) {
      state.updateNotice.loading = false;
    }
  },
  actions: {
    updateNotice({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestUpdateNotice');
          await axios.put(`/admin/news/${params.id}`, params);
          commit('successUpdateNotice');
          dispatch('global/notifySuccess', '保存成功', { root: true });
          dispatch('getNotices', state.getNotices.params);
        },
        () => {
          commit('failureUpdateNotice');
        }
      );
    }
  }
};
