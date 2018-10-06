import Index from './index';
import All from './All';
import Audit from './Audit';

export default {
  path: '/group',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'all',
      component: All
    },
    {
      path: 'audit',
      component: Audit
    }
  ]
};
