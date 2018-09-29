import Index from './index';
import List from './List';

export default {
  path: '/complaint',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'list',
      component: List
    }
  ]
};
