import Index from './index';
import List from './list';

export default {
  path: '/user',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'list',
      component: List
    }
  ]
};
