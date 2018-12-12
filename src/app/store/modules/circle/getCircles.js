import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getCircles: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetCircles(state, params) {
      state.getCircles.params = params;
      state.getCircles.loading = true;
    },
    successGetCircles(state, data) {
      state.getCircles.data = data.content;
      state.getCircles.total = data.totalElements;
      state.getCircles.loading = false;
    },
    failureGetCircles(state) {
      state.getCircles.loading = false;
    }
  },
  actions: {
    getCircles({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetCircles', params);
          let { data } = await axios.get('/admin/circle/', {
            params: {
              ...params
            }
          });
          commit('successGetCircles', data);
        },
        () => {
          commit('failureGetCircles');
        }
      );
    }
  }
};
