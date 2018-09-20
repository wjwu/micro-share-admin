import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    addAd: {
      loading: false
    }
  },
  mutations: {
    requestAddAd(state) {
      state.addAd.loading = true;
    },
    successAddAd(state) {
      state.addAd.loading = false;
    },
    failureAddAd(state) {
      state.addAd.loading = false;
    }
  },
  actions: {
    addAd({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestAddAd');
          await axios.post('/ad/', params);
          commit('successAddAd');
        },
        () => {
          commit('failureAddAd');
        }
      );
    }
  }
};
