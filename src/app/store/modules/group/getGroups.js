import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getGroups: {
      data: [],
      loading: false,
      total: 0
    }
  },
  mutations: {
    requestGetGroups(state) {
      state.getGroups.loading = true;
    },
    successGetGroups(state, data) {
      state.getGroups.data = data;
      state.getGroups.total = data.totalCount;
      state.getGroups.loading = false;
    },
    failureGetGroups(state) {
      state.getGroups.loading = false;
    }
  },
  actions: {
    getGroups({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetGroups');
          let { data } = await axios.get('/admin/group', {
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
