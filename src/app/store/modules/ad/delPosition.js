import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    delPosition: {
      loading: false
    }
  },
  mutations: {
    requestDelPosition(state) {
      state.delPosition.loading = true;
    },
    successDelPosition(state) {
      state.delPosition.loading = false;
    },
    failureDelPosition(state) {
      state.delPosition.loading = false;
    }
  },
  actions: {
    delPosition({ commit }, adId) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestDelPosition');
          await axios.delete(`/ad/position/${adId}`);
          commit('successDelPosition');
          commit('global/notifySuccess', '删除成功！', { root: true });
        },
        () => {
          commit('failureDelPosition');
        }
      );
    }
  }
};
