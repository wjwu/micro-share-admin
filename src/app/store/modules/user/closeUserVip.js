import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    closeUserVip: {
      loading: false
    }
  },
  mutations: {
    requestCloseUserVip(state) {
      state.closeUserVip.loading = true;
    },
    successCloseUserVip(state) {
      state.closeUserVip.loading = false;
    },
    failureCloseUserVip(state) {
      state.closeUserVip.loading = false;
    }
  },
  actions: {
    closeUserVip({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestCloseUserVip');
          await axios.put(`/admin/user/${params.id}/vip/shutdown`, null, {
            params: {
              type: params.type
            }
          });
          commit('successCloseUserVip');
          dispatch('global/notifySuccess', '关闭成功', { root: true });
          dispatch('getUsers', state.getUsers.params);
        },
        () => {
          commit('failureCloseUserVip');
        }
      );
    }
  }
};
