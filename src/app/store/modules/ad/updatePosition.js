import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    updatePosition: {
      loading: false
    }
  },
  mutations: {
    requestUpdatePosition(state) {
      state.updatePosition.loading = true;
    },
    successUpdatePosition(state) {
      state.updatePosition.loading = false;
    },
    failureUpdatePosition(state) {
      state.updatePosition.loading = false;
    }
  },
  actions: {
    updatePosition({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestUpdatePosition');
          await axios.patch('/ad/position', params);
          commit('successUpdatePosition');
          commit('global/notifySuccess', '修改成功！', { root: true });
        },
        () => {
          commit('failureUpdatePosition');
        }
      );
    }
  }
};
