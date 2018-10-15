import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getFeedbacks: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetFeedbacks(state, params) {
      state.getFeedbacks.params = params;
      state.getFeedbacks.loading = true;
    },
    successGetFeedbacks(state, data) {
      state.getFeedbacks.data = data;
      state.getFeedbacks.total = data.totalCount;
      state.getFeedbacks.loading = false;
    },
    failureGetFeedbacks(state) {
      state.getFeedbacks.loading = false;
    }
  },
  actions: {
    getFeedbacks({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetFeedbacks', params);
          let { data } = await axios.get('/admin/feedback', {
            params: {
              ...params
            }
          });
          commit('successGetFeedbacks', data);
        },
        () => {
          commit('failureGetFeedbacks');
        }
      );
    }
  }
};
