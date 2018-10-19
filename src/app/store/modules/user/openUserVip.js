import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    openUserVip: {
      loading: false
    }
  },
  mutations: {
    requestOpenUserVip(state) {
      state.openUserVip.loading = true;
    },
    successOpenUserVip(state) {
      state.openUserVip.loading = false;
    },
    failureOpenUserVip(state) {
      state.openUserVip.loading = false;
    }
  },
  actions: {
    openUserVip({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestOpenUserVip');
          await axios.put(`/admin/user/${params.id}/vip/open`, null, {
            params: {
              ...params
            }
          });
          commit('successOpenUserVip');
          dispatch('global/notifySuccess', '开通成功', { root: true });
          dispatch('getUsers', state.getUsers.params);
        },
        () => {
          commit('failureOpenUserVip');
        }
      );
    }
  }
};
