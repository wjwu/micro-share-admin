import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getAds: {
      data: [],
      total: 0,
      loading: false
    }
  },
  mutations: {
    requestGetAds(state) {
      state.getAds.loading = true;
    },
    successGetAds(state, data) {
      state.getAds.data = data.list;
      state.getAds.total = data.totalCount;
      state.getAds.loading = false;
    },
    failureGetAds(state) {
      state.getAds.loading = false;
    }
  },
  actions: {
    getAds({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetAds');
          const response = await axios.get('/ad/list', {
            params: {
              ...params
            }
          });
          commit('successGetAds', response.data);
        },
        () => {
          commit('failureGetAds');
        }
      );
    }
  }
};
