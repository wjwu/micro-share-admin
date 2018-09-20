import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getAd: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetAd(state) {
      state.getAd.loading = true;
    },
    successGetAd(state, data) {
      state.getAd.data = data;
      state.getAd.loading = false;
    },
    failureGetAd(state) {
      state.getAd.loading = false;
    }
  },
  actions: {
    getAd({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetAd');
          const response = await axios.get(`/ad/${id}`);
          commit('successGetAd', response.data);
          return response.data;
        },
        () => {
          commit('failureGetAd');
        }
      );
    }
  }
};
