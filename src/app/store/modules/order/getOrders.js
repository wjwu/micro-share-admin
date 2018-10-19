import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getOrders: {
      data: [],
      loading: false,
      total: 0
    }
  },
  mutations: {
    requestGetOrders(state) {
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
          commit('requestGetOrders');
          let { data } = await axios.get('/admin/order', {
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
