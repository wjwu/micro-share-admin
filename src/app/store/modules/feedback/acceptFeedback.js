import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    acceptFeedback: {
      loading: false
    }
  },
  mutations: {
    requestAcceptFeedback(state) {
      state.acceptFeedback.loading = true;
    },
    successAcceptFeedback(state) {
      state.acceptFeedback.loading = false;
    },
    failureAcceptFeedback(state) {
      state.acceptFeedback.loading = false;
    }
  },
  actions: {
    acceptFeedback({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestAcceptFeedback');
          await axios.put(`/admin/feedback/${params.id}/agree`, {
            score: params.score
          });
          commit('successAcceptFeedback');
          dispatch('global/notifySuccess', '操作成功', { root: true });
          dispatch('getFeedbacks', state.getFeedbacks.params);
        },
        () => {
          commit('failureAcceptFeedback');
        }
      );
    }
  }
};
