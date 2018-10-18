import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getCount: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetCount(state) {
      state.getCount.loading = true;
    },
    successGetCount(state, data) {
      state.getCount.data = data;
      state.getCount.loading = false;
    },
    failureGetCount(state) {
      state.getCount.loading = false;
    }
  },
  actions: {
    getCount({ commit }) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetCount');
          const response = await axios.get('/admin/countData');
          commit('successGetCount', response.data);
        },
        () => {
          commit('failureGetCount');
        }
      );
    }
  }
};
