import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    deleteAdmin: {
      loading: false
    }
  },
  mutations: {
    requestDeleteAdmin(state) {
      state.deleteAdmin.loading = true;
    },
    successDeleteAdmin(state) {
      state.deleteAdmin.loading = false;
    },
    failureDeleteAdmin(state) {
      state.deleteAdmin.loading = false;
    }
  },
  actions: {
    deleteAdmin({ commit, dispatch, state }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestDeleteAdmin');
          await axios.delete(`/admin/${id}`);
          commit('successDeleteAdmin');
          dispatch('global/notifySuccess', '删除成功', { root: true });
          dispatch('getAdmins', state.getAdmins.params);
        },
        () => {
          commit('failureDeleteAdmin');
        }
      );
    }
  }
};
