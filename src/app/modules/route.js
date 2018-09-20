import Vue from 'vue';
import VueRouter from 'vue-router';
import session from '../../common/js/session';
import home from './home/route';
import others from './others/route';
import product from './product/route';
import finance from './finance/route';
import user from './user/route';
import operation from './operation/route';
import market from './market/route';
import push from './push/route';
import setup from './setup/route';
import ad from './ad/route';
import test from './test/route';
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/',
      redirect: '/home'
    },
    home,
    others,
    product,
    finance,
    user,
    operation,
    market,
    push,
    setup,
    setup,
    test,
    ad
  ]
});

router.beforeEach((to, from, next) => {
  if (!session.getString('token')) {
    next(false);
    window.parent.location.href = './login.html';
  } else {
    next();
  }
});

export default router;
