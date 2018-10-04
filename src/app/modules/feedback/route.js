import Index from './index';
import List from './List';

export default {
  path: '/feedback',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'list',
      component: List
    }
  ]
};
