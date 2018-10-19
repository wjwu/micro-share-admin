import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getAdmins: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetAdmins(state, params) {
      state.getAdmins.params = params;
      state.getAdmins.loading = true;
    },
    successGetAdmins(state, data) {
      state.getAdmins.data = data;
      state.getAdmins.loading = false;
    },
    failureGetAdmins(state) {
      state.getAdmins.loading = false;
    }
  },
  actions: {
    getAdmins({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetAdmins', params);
          const { data } = await axios.get('/admin/', {
            params: {
              ...params
            }
          });
          commit('successGetAdmins', data);
        },
        () => {
          commit('failureGetAdmins');
        }
      );
    }
  }
};
