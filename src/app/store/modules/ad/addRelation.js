import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    addRelation: {
      loading: false
    }
  },
  mutations: {
    requestAddRelation(state) {
      state.addRelation.loading = true;
    },
    successAddRelation(state) {
      state.addRelation.loading = false;
    },
    failureAddRelation(state) {
      state.addRelation.loading = false;
    }
  },
  actions: {
    addRelation({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestAddRelation');
          await axios.post('/ad/position/relevance', params);
          commit('successAddRelation');
          commit('global/notifySuccess', '操作成功！', { root: true });
        },
        () => {
          commit('failureAddRelation');
        }
      );
    }
  }
};
