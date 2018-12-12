import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getOrders: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetOrders(state, params) {
      state.getOrders.params = params;
      state.getOrders.loading = true;
    },
    successGetOrders(state, data) {
      state.getOrders.data = data.content;
      state.getOrders.total = data.totalElements;
      state.getOrders.loading = false;
    },
    failureGetOrders(state) {
      state.getOrders.loading = false;
    }
  },
  actions: {
    getOrders({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetOrders', params);
          let { data } = await axios.get('/admin/shop/order', {
            params: {
              ...params
            }
          });
          commit('successGetOrders', data);
        },
        () => {
          commit('failureGetOrders');
        }
      );
    }
  }
};
