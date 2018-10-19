import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getSales: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetSales(state) {
      state.getSales.loading = true;
    },
    successGetSales(state, data) {
      state.getSales.data = data;
      state.getSales.loading = false;
    },
    failureGetSales(state) {
      state.getSales.loading = false;
    }
  },
  actions: {
    getSales({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetSales');
          const response = await axios.get('/admin/buyData');
          commit('successGetSales', response.data);
        },
        () => {
          commit('failureGetSales');
        }
      );
    }
  }
};
