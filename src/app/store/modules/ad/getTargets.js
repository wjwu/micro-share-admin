import axios from '../../../utils/axios';
import helper from '../../../utils/storeHelper';

export default {
  state: {
    getTargets: {
      loading: false,
      data: [],
      total: 0
    }
  },
  mutations: {
    requestGetTargets(state) {
      state.getTargets.loading = true;
    },
    successGetTargets(state, data) {
      state.getTargets.loading = false;
      state.getTargets.data = data.list;
      state.getTargets.total = data.totalCount;
    },
    failureGetTargets(state) {
      state.getTargets.loading = false;
    }
  },
  actions: {
    getTargets({ commit }, params) {
      return helper.actionWrapper(
        commit,
        async () => {
          commit('requestGetTargets');
          let response;
          if (params.plate === 'ITEM_INFO') {
            response = await axios.get('/item/search', {
              params: {
                ...params,
                title: params.keyword
              }
            });
          } else if (params.plate === 'SHOP') {
            response = await axios.get('/shop/getShopApplicationList', {
              params: {
                ...params,
                companyName: params.keyword
              }
            });
          } else if (params.plate === 'MEDIA') {
            response = await axios.get('/me/media/column', {
              params: {
                ...params,
                name: params.keyword
              }
            });
          } else if (params.plate === 'ARTICLE') {
            response = await axios.get('/me/media/article', {
              params: {
                ...params,
                key: params.keyword
              }
            });
          } else if (params.plate === 'ALBUM') {
            response = await axios.get('/me/media/album/list', {
              params: {
                ...params,
                searchKerword: params.keyword
              }
            });
          } else if (params.plate === 'QA') {
            response = await axios.get('/me/media/question', {
              params: {
                ...params,
                keywords: params.keyword
              }
            });
          }
          commit('successGetTargets', response.data);
          return response.data.list;
        },
        () => {
          commit('failureGetTargets');
        }
      );
    }
  }
};
