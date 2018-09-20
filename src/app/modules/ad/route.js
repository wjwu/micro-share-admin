import Index from './index';
import SiteList from './site/index';
// import SiteAdd from './site/add';
import AdManage from './site/manage';
import AdList from './list';
import AdAdd from './add';
import AdEdit from './edit';

export default {
  path: '/ad',
  redirect: '/404',
  component: Index,
  children: [
    {
      path: 'site',
      component: SiteList
    },
    // {
    //   path: 'site/add',
    //   component: SiteAdd
    // },
    {
      path: 'manage/:id',
      component: AdManage
    },
    {
      path: 'list',
      component: AdList
    },
    {
      path: 'add',
      component: AdAdd
    },
    {
      path: 'edit/:id',
      component: AdEdit
    }
  ]
};
