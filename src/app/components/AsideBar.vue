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
      <el-menu-item :index="COMPLAINT">
        <i class="fa fa-comments"></i>
        <span>投诉</span>
      </el-menu-item>
      <el-menu-item :index="USER">
        <i class="fa fa-user"></i>
        <span>用户</span>
      </el-menu-item>
      <el-menu-item :index="GROUP">
        <i class="fa fa-users"></i>
        <span>群组</span>
      </el-menu-item>
      <el-menu-item :index="FEEDBACK">
        <i class="fa fa-feed"></i>
        <span>反馈</span>
      </el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
const HOME = '/home';
const USER = '/user/list';
const GROUP = '/group/list';
const ORDER = '/order/list';
const COMPLAINT = '/complaint/list';
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
      ORDER,
      COMPLAINT,
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
.fa{
  min-width: 18px;
}
</style>
