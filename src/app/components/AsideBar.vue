<template>
  <div class="asider">
    <div class="logo">
      商伴部落后台管理系统
    </div>
    <el-menu :default-active="defaultActive" class="main-menu" router>
      <el-menu-item :index="HOME">
        首页
      </el-menu-item>
      <el-menu-item :index="USER">
        用户
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
const HOME = '/home';
const USER = '/user/list';

export default {
  computed: {
    defaultActive() {
      return window.location.hash.substring(1);
    }
  },
  data() {
    return {
      HOME,
      USER
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
  background-color: #f3f7ff;
}
.logo {
  height: 66px;
  line-height: 66px;
  background-position: 20px 50%;
  font-size: 13px;
  color: #585858;
  text-align: center;
  padding-right: 20px;
}
.main-menu {
  overflow: auto;
}
</style>
