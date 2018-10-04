<template>
  <div class="asider">
    <div class="logo">
      商伴部落后台管理系统
    </div>
    <el-menu :default-active="defaultActive" class="main-menu" router>
      <el-menu-item :index="HOME">
        首页
      </el-menu-item>
      <el-menu-item :index="ORDER">
        订单
      </el-menu-item>
      <el-menu-item :index="COMPLAINT">
        投诉
      </el-menu-item>
      <el-menu-item :index="USER">
        用户
      </el-menu-item>
      <el-menu-item :index="GROUP">
        群组
      </el-menu-item>
      <el-menu-item :index="FEEDBACK">
        反馈
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
</style>
