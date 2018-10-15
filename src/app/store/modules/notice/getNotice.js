import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getGroup: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetGroup(state) {
      state.getGroup.loading = true;
    },
    successGetGroup(state, data) {
      state.getGroup.data = data;
      state.getGroup.loading = false;
    },
    failureGetGroup(state) {
      state.getGroup.loading = false;
    }
  },
  actions: {
    getGroup({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetGroup');
          const response = await axios.get(`/admin/group/${id}`);
          commit('successGetGroup', response.data);
        },
        () => {
          commit('failureGetGroup');
        }
      );
    }
  }
};
