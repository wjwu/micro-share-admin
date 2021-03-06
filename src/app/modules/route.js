import Vue from 'vue';
import VueRouter from 'vue-router';
import session from '../../common/js/session';
import home from './home/route';
import user from './user/route';
import group from './group/route';
import order from './order/route';
import complaint from './complaint/route';
import feedback from './feedback/route';
import notice from './notice/route';
import admin from './admin/route';
import sale from './sale/route';
import item from './item/route';
import task from './task/route';
import circle from './circle/route';
import shop from './shop/route';

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
    complaint,
    feedback,
    notice,
    admin,
    sale,
    item,
    task,
    circle,
    shop
  ]
});

router.beforeEach((to, from, next) => {
  if (!session.getString('operator')) {
    next(false);
    window.parent.location.href = './login.html';
  } else {
    next();
  }
});

export default router;
