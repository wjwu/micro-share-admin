import Index from './index';
import All from './All';

export default {
  path: '/circle',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'all',
      component: All
    }
  ]
};
