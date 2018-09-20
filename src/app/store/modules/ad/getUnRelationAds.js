import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getUnRelationAds: {
      data: null,
      total: 0,
      loading: false
    }
  },
  mutations: {
    requestGetUnRelationAds(state) {
      state.getUnRelationAds.loading = true;
    },
    successGetUnRelationAds(state, data) {
      state.getUnRelationAds.data = data.list;
      state.getUnRelationAds.total = data.totalCount;
      state.getUnRelationAds.loading = false;
    },
    failureGetUnRelationAds(state) {
      state.getUnRelationAds.loading = false;
    }
  },
  actions: {
    getUnRelationAds({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetUnRelationAds');
          const response = await axios.get('/ad/notAssociated', {
            params: {
              ...params
            }
          });
          commit('successGetUnRelationAds', response.data);
          return response.data.list;
        },
        () => {
          commit('failureGetUnRelationAds');
        }
      );
    }
  }
};
