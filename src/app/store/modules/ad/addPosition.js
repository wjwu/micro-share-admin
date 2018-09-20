import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    addPosition: {
      loading: false
    }
  },
  mutations: {
    requestAddPosition(state) {
      state.addPosition.loading = true;
    },
    successAddPosition(state) {
      state.addPosition.loading = false;
    },
    failureAddPosition(state) {
      state.addPosition.loading = false;
    }
  },
  actions: {
    addPosition({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestAddPosition');
          const { data } = await axios.post('/ad/position', params);
          commit('successAddPosition');
          return data;
        },
        () => {
          commit('failureAddPosition');
        }
      );
    }
  }
};
