import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getUsers: {
      data: [],
      loading: false,
      total: 0
    }
  },
  mutations: {
    requestGetUsers(state) {
      state.getUsers.loading = true;
    },
    successGetUsers(state, data) {
      state.getUsers.data = data.content;
      state.getUsers.total = data.totalElements;
      state.getUsers.loading = false;
    },
    failureGetUsers(state) {
      state.getUsers.loading = false;
    }
  },
  actions: {
    getUsers({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetUsers');
          let { data } = await axios.get('/admin/user', {
            params: {
              ...params
            }
          });
          commit('successGetUsers', data);
        },
        () => {
          commit('failureGetUsers');
        }
      );
    }
  }
};
