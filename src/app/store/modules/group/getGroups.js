import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getGroups: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetGroups(state, params) {
      state.getGroups.params = params;
      state.getGroups.loading = true;
    },
    successGetGroups(state, data) {
      state.getGroups.data = data.content;
      state.getGroups.total = data.totalElements;
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
          commit('requestGetGroups', params);
          let url = '/admin/group/';
          if (params.review) {
            url = '/admin/group/review';
          }
          const { data } = await axios.get(url, {
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
