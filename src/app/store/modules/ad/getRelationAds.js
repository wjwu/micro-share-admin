import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getRelationAds: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetRelationAds(state) {
      state.getRelationAds.loading = true;
    },
    successGetRelationAds(state, data) {
      state.getRelationAds.data = data;
      state.getRelationAds.loading = false;
    },
    failureGetRelationAds(state) {
      state.getRelationAds.loading = false;
    }
  },
  actions: {
    getRelationAds({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetRelationAds');
          const response = await axios.get(`/ad/position/${id}`, {
            params: {
              adPositionId: id
            }
          });
          commit('successGetRelationAds', response.data);
          return response.data;
        },
        () => {
          commit('failureGetRelationAds');
        }
      );
    }
  }
};
