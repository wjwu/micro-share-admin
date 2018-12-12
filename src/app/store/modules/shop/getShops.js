import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getShops: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetShops(state, params) {
      state.getShops.params = params;
      state.getShops.loading = true;
    },
    successGetShops(state, data) {
      state.getShops.data = data.content;
      state.getShops.total = data.totalElements;
      state.getShops.loading = false;
    },
    failureGetShops(state) {
      state.getShops.loading = false;
    }
  },
  actions: {
    getShops({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetShops', params);
          let { data } = await axios.get('/admin/shop/', {
            params: {
              ...params
            }
          });
          commit('successGetShops', data);
        },
        () => {
          commit('failureGetShops');
        }
      );
    }
  }
};
