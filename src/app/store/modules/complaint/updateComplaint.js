import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    updateComplaint: {
      loading: false
    }
  },
  mutations: {
    requestUpdateComplaint(state) {
      state.updateComplaint.loading = true;
    },
    successUpdateComplaint(state) {
      state.updateComplaint.loading = false;
    },
    failureUpdateComplaint(state) {
      state.updateComplaint.loading = false;
    }
  },
  actions: {
    updateComplaint({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestUpdateComplaint');
          await axios.put(`/admin/complaint/${params.id}/${params.type}`);
          commit('successUpdateComplaint');
          commit('global/notifySuccess', '操作成功', { root: true });
        },
        () => {
          commit('failureUpdateComplaint');
        }
      );
    }
  }
};
