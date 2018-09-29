import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getOrder: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetOrder(state) {
      state.getOrder.loading = true;
    },
    successGetOrder(state, data) {
      state.getOrder.data = data;
      state.getOrder.loading = false;
    },
    failureGetOrder(state) {
      state.getOrder.loading = false;
    }
  },
  actions: {
    getOrder({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetOrder');
          const response = await axios.get(`/admin/order/${id}`);
          commit('successGetOrder', response.data);
        },
        () => {
          commit('failureGetOrder');
        }
      );
    }
  }
};
