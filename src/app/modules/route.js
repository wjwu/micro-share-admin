import Vue from 'vue';
import VueRouter from 'vue-router';
// import session from '../../common/js/session';
import home from './home/route';
import test from './test/route';
import user from './user/route';
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
    test,
    user
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
