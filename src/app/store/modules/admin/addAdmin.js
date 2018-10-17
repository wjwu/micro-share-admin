import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    addAdmin: {
      loading: false
    }
  },
  mutations: {
    requestAddAdmin(state) {
      state.addAdmin.loading = true;
    },
    successAddAdmin(state) {
      state.addAdmin.loading = false;
    },
    failureAddAdmin(state) {
      state.addAdmin.loading = false;
    }
  },
  actions: {
    addAdmin({ commit, dispatch, state }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestAddAdmin');
          await axios.post('/admin/', params);
          commit('successAddAdmin');
          dispatch('global/notifySuccess', '添加成功', { root: true });
          dispatch('getAdmins', state.getAdmins.params);
        },
        () => {
          commit('failureAddAdmin');
        }
      );
    }
  }
};
