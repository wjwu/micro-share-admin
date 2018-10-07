import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    updateGroup: {
      loading: false
    }
  },
  mutations: {
    requestUpdateGroup(state) {
      state.updateGroup.loading = true;
    },
    successUpdateGroup(state) {
      state.updateGroup.loading = false;
    },
    failureUpdateGroup(state) {
      state.updateGroup.loading = false;
    }
  },
  actions: {
    updateGroup({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestUpdateGroup');
          await axios.post(`/admin/group/review/${params.type}`, null, {
            params: {
              groupId: params.id
            }
          });
          commit('successUpdateGroup');
          commit('global/notifySuccess', '操作成功', { root: true });
        },
        () => {
          commit('failureUpdateGroup');
        }
      );
    }
  }
};
