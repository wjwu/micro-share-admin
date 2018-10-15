import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getNotices: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetNotices(state, params) {
      state.getNotices.params = params;
      state.getNotices.loading = true;
    },
    successGetNotices(state, data) {
      state.getNotices.data = data.content;
      state.getNotices.total = data.totalElements;
      state.getNotices.loading = false;
    },
    failureGetNotices(state) {
      state.getNotices.loading = false;
    }
  },
  actions: {
    getNotices({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetNotices', params);
          const { data } = await axios.get('/admin/news/', {
            params: {
              ...params
            }
          });
          commit('successGetNotices', data);
        },
        () => {
          commit('failureGetNotices');
        }
      );
    }
  }
};
