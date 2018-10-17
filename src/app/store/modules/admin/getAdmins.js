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
    requestGetGroups(state, params) {
      state.getAdmins.params = params;
      state.getAdmins.loading = true;
    },
    successGetGroups(state, data) {
      state.getAdmins.data = data;
      state.getAdmins.loading = false;
    },
    failureGetGroups(state) {
      state.getAdmins.loading = false;
    }
  },
  actions: {
    getAdmins({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetGroups', params);
          const { data } = await axios.get('/admin/', {
            params: {
              ...params
            }
          });
          commit('successGetGroups', data);
        },
        () => {
          commit('failureGetGroups');
        }
      );
    }
  }
};
