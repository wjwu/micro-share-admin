import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getItems: {
      data: [],
      loading: false,
      total: 0,
      params: null
    }
  },
  mutations: {
    requestGetItems(state, params) {
      state.getItems.params = params;
      state.getItems.loading = true;
    },
    successGetItems(state, data) {
      data.content = data.content.map(item => {
        if (!item.imgUrl) {
          item.imgUrl = '';
        }
        return {
          ...item,
          images: item.imgUrl.split(',')
        };
      });
      state.getItems.data = data.content;
      state.getItems.total = data.totalElements;
      state.getItems.loading = false;
    },
    failureGetItems(state) {
      state.getItems.loading = false;
    }
  },
  actions: {
    getItems({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetItems', params);
          const { data } = await axios.get('/admin/item', {
            params: {
              ...params
            }
          });
          commit('successGetItems', data);
        },
        () => {
          commit('failureGetItems');
        }
      );
    }
  }
};
