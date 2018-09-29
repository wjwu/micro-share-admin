import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getComplaint: {
      data: null,
      loading: false
    }
  },
  mutations: {
    requestGetComplaint(state) {
      state.getComplaint.loading = true;
    },
    successGetComplaint(state, data) {
      state.getComplaint.data = data;
      state.getComplaint.loading = false;
    },
    failureGetComplaint(state) {
      state.getComplaint.loading = false;
    }
  },
  actions: {
    getComplaint({ commit }, id) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetComplaint');
          const response = await axios.get(`/admin/complaint/${id}`);
          commit('successGetComplaint', response.data);
        },
        () => {
          commit('failureGetComplaint');
        }
      );
    }
  }
};
