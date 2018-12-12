<template>
  <div class="asider">
    <div class="logo">
      商伴部落后台管理系统
    </div>
    <el-menu :default-active="defaultActive" class="main-menu" router>
      <el-menu-item :index="HOME">
        <i class="fa fa-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item :index="ORDER">
        <i class="fa fa-file-text"></i>
        <span>订单列表</span>
      </el-menu-item>
      <el-submenu :index="COMPLAINT">
        <template slot="title">
          <i class="fa fa-comments"></i>
          <span>投诉</span>
        </template>
        <el-menu-item :index="COMPLAINT_ALL">全部投诉</el-menu-item>
        <el-menu-item :index="COMPLAINT_PENDING">待处理投诉</el-menu-item>
      </el-submenu>
      <el-submenu :index="USER">
        <template slot="title">
          <i class="fa fa-user"></i>
          <span>用户</span>
        </template>
        <el-menu-item :index="USER_ALL">全部用户</el-menu-item>
        <el-menu-item :index="USER_VIP" v-if="userName === 'admin'">管家管理</el-menu-item>
      </el-submenu>
      <el-submenu index='GROUP'>
        <template slot="title">
          <i class="fa fa-users"></i>
          <span>群组</span>
        </template>
        <el-menu-item :index="GROUP_ALL">全部群组</el-menu-item>
        <el-menu-item :index="GROUP_AUDIT">待审核群组</el-menu-item>
      </el-submenu>
      <el-submenu index='CIRCLE'>
        <template slot="title">
          <i class="fa fa-circle-o"></i>
          <span>圈子</span>
        </template>
        <el-menu-item :index="CIRCLE_ALL">全部圈子</el-menu-item>
      </el-submenu>
      <el-submenu index='SHOP'>
        <template slot="title">
          <i class="fa fa-university"></i>
          <span>店铺</span>
        </template>
        <el-menu-item :index="SHOP_ALL">全部店铺</el-menu-item>
      </el-submenu>
      <el-menu-item :index="ITEMS">
        <i class="fa fa-product-hunt"></i>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item :index="TASKS">
        <i class="fa fa-tasks"></i>
        <span>任务列表</span>
      </el-menu-item>
      <el-menu-item :index="FEEDBACK">
        <i class="fa fa-feed"></i>
        <span>反馈</span>
      </el-menu-item>
      <el-menu-item :index="NOTICE" v-if="userName === 'admin'">
        <i class="fa fa-bullhorn"></i>
        <span>公告</span>
      </el-menu-item>
      <el-menu-item :index="ADMINS" v-if="userName === 'admin'">
        <i class="fa fa-user-circle"></i>
        <span>管理员</span>
      </el-menu-item>
      <el-menu-item :index="SALES" v-if="userName === 'admin'">
        <i class="fa fa-money"></i>
        <span>销售额</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import session from '../../common/js/session';

const HOME = '/home';
const USER = '/user';
const USER_ALL = '/user/all';
const USER_VIP = '/user/vip';
const GROUP_ALL = '/group/all';
const GROUP_AUDIT = '/group/audit';
const ORDER = '/order/list';
const COMPLAINT = '/complaint';
const COMPLAINT_ALL = '/complaint/all';
const COMPLAINT_PENDING = '/complaint/pending';
const FEEDBACK = '/feedback/list';
const NOTICE = '/notice/list';
const ADMINS = '/admins';
const SALES = '/sales';
const ITEMS = '/items';
const TASKS = '/tasks';
const CIRCLE_ALL = '/circle/all';
const SHOP_ALL = '/shop/all';

export default {
  computed: {
    defaultActive() {
      return window.location.hash.substring(1);
    }
  },
  data() {
    return {
      userName: session.getString('operator'),
      HOME,
      USER,
      USER_ALL,
      USER_VIP,
      GROUP_ALL,
      GROUP_AUDIT,
      ORDER,
      COMPLAINT,
      COMPLAINT_ALL,
      COMPLAINT_PENDING,
      FEEDBACK,
      NOTICE,
      ADMINS,
      SALES,
      ITEMS,
      TASKS,
      CIRCLE_ALL,
      SHOP_ALL
    };
  }
};
</script>

<style>
.asider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 240px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.logo {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  padding-right: 20px;
  background-color: #409eff;
}
.main-menu {
  overflow: auto;
  flex: 1;
}
.fa {
  min-width: 18px;
}
</style>
