import Index from './index';
import All from './All';
import Vip from './Vip';

export default {
  path: '/user',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'all',
      component: All
    },
    {
      path: 'vip',
      component: Vip
    }
  ]
};
