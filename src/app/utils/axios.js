import axios from 'axios';
import session from '../../common/js/session';
import config from '../../common/js/config';

axios.interceptors.request.use(cf => {
  cf.headers['Authorization'] = session.getString('token') || '';
  cf.baseURL = config.apiHost;
  return cf;
});

axios.postForm = (url, data, cf) => {
  return axios.post(url, data, {
    ...cf,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      data => {
        let ret = '';
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
      }
    ]
  });
};

export default axios;
