<template>
  <div v-if="isShowApp">
    <aside-bar/>
    <div class="content-wrapper">
      <header-nav/>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div v-show="false">{{`${notifySuccess}${notifyWarning}${notifyInfo}${notifyError}`}}</div>
  </div>
</template>

<script>
import AsideBar from './components/AsideBar';
import HeaderNav from './components/HeaderNav';

export default {
  components: {
    AsideBar,
    HeaderNav
  },
  data() {
    return {
      isShowApp: true
    };
  },
  computed: {
    notifySuccess() {
      const notify = this.$store.state.global.notifySuccess;
      if (notify.message) {
        this.$message.success({
          duration: 5000,
          message: notify.message
        });
      }
      return '';
    },
    notifyWarning() {
      const notify = this.$store.state.global.notifyWarning;
      if (notify.message) {
        this.$message.warning({
          duration: 5000,
          message: notify.message
        });
      }
      return '';
    },
    notifyInfo() {
      const notify = this.$store.state.global.notifyInfo;
      if (notify.message) {
        this.$message.info({
          duration: 5000,
          message: notify.message
        });
      }
      return '';
    },
    notifyError() {
      const notify = this.$store.state.global.notifyError;
      if (notify.message) {
        this.$message.error({
          duration: 5000,
          message: notify.message
        });
      }
      return '';
    }
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  position: relative;
  min-height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.content-wrapper {
  margin-left: 240px;
}
.content {
  padding: 20px;
}
</style>


