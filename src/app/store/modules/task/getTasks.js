import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getTasks: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetTasks(state, params) {
      state.getTasks.params = params;
      state.getTasks.loading = true;
    },
    successGetTasks(state, data) {
      data.content = data.content.map(item => {
        if (!item.img) {
          item.img = '';
        }
        return {
          ...item,
          images: item.img.split(',')
        };
      });
      state.getTasks.data = data.content;
      state.getTasks.total = data.totalElements;
      state.getTasks.loading = false;
    },
    failureGetTasks(state) {
      state.getTasks.loading = false;
    }
  },
  actions: {
    getTasks({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetTasks', params);
          const { data } = await axios.get('/admin/task', {
            params: {
              ...params
            }
          });
          commit('successGetTasks', data);
        },
        () => {
          commit('failureGetTasks');
        }
      );
    }
  }
};
