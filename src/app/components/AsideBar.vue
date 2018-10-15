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
        <span>订单</span>
      </el-menu-item>
      <el-submenu :index="COMPLAINT">
        <template slot="title">
          <i class="fa fa-comments"></i>
          <span>投诉</span>
        </template>
        <el-menu-item :index="COMPLAINT_ALL">全部投诉</el-menu-item>
        <el-menu-item :index="COMPLAINT_PENDING">待处理投诉</el-menu-item>
      </el-submenu>
      <el-menu-item :index="USER">
        <i class="fa fa-user"></i>
        <span>用户</span>
      </el-menu-item>
      <el-submenu :index="GROUP">
        <template slot="title">
          <i class="fa fa-users"></i>
          <span>群组</span>
        </template>
        <el-menu-item :index="GROUP_ALL">全部群组</el-menu-item>
        <el-menu-item :index="GROUP_AUDIT">待审核群组</el-menu-item>
      </el-submenu>
      <el-menu-item :index="FEEDBACK">
        <i class="fa fa-feed"></i>
        <span>反馈</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
const HOME = '/home';
const USER = '/user/list';
const GROUP = '/group/list';
const GROUP_ALL = '/group/all';
const GROUP_AUDIT = '/group/audit';
const ORDER = '/order/list';
const COMPLAINT = '/complaint';
const COMPLAINT_ALL = '/complaint/all';
const COMPLAINT_PENDING = '/complaint/pending';
const FEEDBACK = '/feedback/list';

export default {
  computed: {
    defaultActive() {
      return window.location.hash.substring(1);
    }
  },
  data() {
    return {
      HOME,
      USER,
      GROUP,
      GROUP_ALL,
      GROUP_AUDIT,
      ORDER,
      COMPLAINT,
      COMPLAINT_ALL,
      COMPLAINT_PENDING,
      FEEDBACK
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
