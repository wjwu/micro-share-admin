import Index from './index';
import All from './All';
import Order from './Order';

export default {
  path: '/shop',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'all',
      component: All
    },
    {
      path: 'order',
      component: Order
    }
  ]
};
