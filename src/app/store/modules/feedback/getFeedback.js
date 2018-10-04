import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getFeedback: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetFeedback(state) {
      state.getFeedback.loading = true;
    },
    successGetFeedback(state, data) {
      state.getFeedback.data = data;
      state.getFeedback.loading = false;
    },
    failureGetFeedback(state) {
      state.getFeedback.loading = false;
    }
  },
  actions: {
    getFeedback({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetFeedback');
          const response = await axios.get(`/admin/feedback/${id}`);
          commit('successGetFeedback', response.data);
        },
        () => {
          commit('failureGetFeedback');
        }
      );
    }
  }
};
