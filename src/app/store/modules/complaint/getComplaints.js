import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getComplaints: {
      data: [],
      loading: false,
      total: 0
    }
  },
  mutations: {
    requestGetComplaints(state) {
      state.getComplaints.loading = true;
    },
    successGetComplaints(state, data) {
      state.getComplaints.data = data.content;
      state.getComplaints.total = data.totalElements;
      state.getComplaints.loading = false;
    },
    failureGetComplaints(state) {
      state.getComplaints.loading = false;
    }
  },
  actions: {
    getComplaints({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetComplaints');
          let { data } = await axios.get('/admin/complaint/', {
            params: {
              ...params
            }
          });
          commit('successGetComplaints', data);
        },
        () => {
          commit('failureGetComplaints');
        }
      );
    }
  }
};
