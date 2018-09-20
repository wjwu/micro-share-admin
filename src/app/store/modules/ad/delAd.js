import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    delAd: {
      loading: false
    }
  },
  mutations: {
    requestDelAd(state) {
      state.delAd.loading = true;
    },
    successDelAd(state) {
      state.delAd.loading = false;
    },
    failureDelAd(state) {
      state.delAd.loading = false;
    }
  },
  actions: {
    delAd({ commit }, adId) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestDelAd');
          await axios.delete(`/ad/${adId}`);
          commit('successDelAd');
          commit('global/notifySuccess', '删除成功！', { root: true });
        },
        () => {
          commit('failureDelAd');
        }
      );
    }
  }
};
