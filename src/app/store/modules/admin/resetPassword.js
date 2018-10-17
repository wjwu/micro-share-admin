import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    resetPassword: {
      loading: false
    }
  },
  mutations: {
    requestResetPassword(state) {
      state.resetPassword.loading = true;
    },
    successResetPassword(state) {
      state.resetPassword.loading = false;
    },
    failureResetPassword(state) {
      state.resetPassword.loading = false;
    }
  },
  actions: {
    resetPassword({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestResetPassword');
          await axios.patch(`/admin/${params.id}`, {
            passWord: params.password
          });
          commit('successResetPassword');
          dispatch('global/notifySuccess', '修改成功', { root: true });
          dispatch('getAdmins', state.getAdmins.params);
        },
        () => {
          commit('failureResetPassword');
        }
      );
    }
  }
};
