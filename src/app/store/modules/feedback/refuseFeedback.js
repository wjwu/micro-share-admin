import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    refuseFeedback: {
      loading: false
    }
  },
  mutations: {
    requestRefuseFeedback(state) {
      state.refuseFeedback.loading = true;
    },
    successRefuseFeedback(state) {
      state.refuseFeedback.loading = false;
    },
    failureRefuseFeedback(state) {
      state.refuseFeedback.loading = false;
    }
  },
  actions: {
    refuseFeedback({ commit, dispatch, state }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestRefuseFeedback');
          await axios.put(`/admin/feedback/${id}/refuse`);
          commit('successRefuseFeedback');
          dispatch('global/notifySuccess', '操作成功', { root: true });
          dispatch('getNotices', state.getFeedbacks.params);
        },
        () => {
          commit('failureRefuseFeedback');
        }
      );
    }
  }
};
