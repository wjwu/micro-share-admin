import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getPositions: {
      data: [],
      total: 0,
      loading: false
    }
  },
  mutations: {
    requestGetPositions(state) {
      state.getPositions.loading = true;
    },
    successGetPositions(state, data) {
      state.getPositions.data = data.list;
      state.getPositions.total = data.totalCount;
      state.getPositions.loading = false;
    },
    failureGetPositions(state) {
      state.getPositions.loading = false;
    }
  },
  actions: {
    getPositions({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetPositions');
          const response = await axios.get('/ad/position/', {
            params: {
              ...params
            }
          });
          commit('successGetPositions', response.data);
        },
        () => {
          commit('failureGetPositions');
        }
      );
    }
  }
};
