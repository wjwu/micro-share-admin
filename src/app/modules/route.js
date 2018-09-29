import Vue from 'vue';
import VueRouter from 'vue-router';
// import session from '../../common/js/session';
import home from './home/route';
import user from './user/route';
import group from './group/route';
import order from './order/route';
import complaint from './complaint/route';

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
    user,
    group,
    order,
    complaint
  ]
});

router.beforeEach((to, from, next) => {
  // if (!session.getString('token')) {
  //   next(false);
  //   window.parent.location.href = './login.html';
  // } else {
  next();
  // }
});

export default router;
