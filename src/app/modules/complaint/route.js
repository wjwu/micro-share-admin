import Index from './index';
import All from './All';
import Pending from './Pending';

export default {
  path: '/complaint',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'all',
      component: All
    },
    {
      path: 'pending',
      component: Pending
    }
  ]
};
