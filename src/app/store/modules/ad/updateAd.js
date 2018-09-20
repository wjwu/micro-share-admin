import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    updateAd: {
      loading: false
    }
  },
  mutations: {
    requestUpdateAdd(state) {
      state.updateAd.loading = true;
    },
    successUpdateAdd(state) {
      state.updateAd.loading = false;
    },
    failureUpdateAdd(state) {
      state.updateAd.loading = false;
    }
  },
  actions: {
    updateAd({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestUpdateAdd');
          await axios.put('/ad/edit', params);
          commit('successUpdateAdd');
          commit('global/notifySuccess', '修改成功！', { root: true });
        },
        () => {
          commit('failureUpdateAdd');
        }
      );
    }
  }
};
