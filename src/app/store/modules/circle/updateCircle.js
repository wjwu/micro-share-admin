import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    updateCircle: {
      loading: false
    }
  },
  mutations: {
    requestUpdateCircle(state) {
      state.updateCircle.loading = true;
    },
    successUpdateCircle(state) {
      state.updateCircle.loading = false;
    },
    failureUpdateCircle(state) {
      state.updateCircle.loading = false;
    }
  },
  actions: {
    updateCircle({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestUpdateCircle');
          await axios.put(`/admin/circle/${params.id}/${params.type}`);
          commit('successUpdateCircle');
          dispatch('global/notifySuccess', '操作成功', { root: true });
          dispatch('getCircles', state.getCircles.params);
        },
        () => {
          commit('failureUpdateCircle');
        }
      );
    }
  }
};
