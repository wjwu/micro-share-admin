import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getPosition: {
      data: [],
      loading: false
    }
  },
  mutations: {
    requestGetPosition(state) {
      state.getPosition.loading = true;
    },
    successGetPosition(state, data) {
      state.getPosition.data = data.list;
      state.getPosition.loading = false;
    },
    failureGetPosition(state) {
      state.getPosition.loading = false;
    }
  },
  actions: {
    getPosition({ commit }, positionId) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetPosition');
          const { data } = await axios.get(`/ad/position/${positionId}`);
          commit('successGetPosition', data);
          return data;
        },
        () => {
          commit('failureGetPosition');
        }
      );
    }
  }
};
