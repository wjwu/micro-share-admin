<template>
  <div class="app" v-if="isShowApp">
    <aside-bar />
    <div class="main">
      <header-nav />
      <div class="cnt">
        <div class="cnt-wrapper">
          <router-view></router-view>
        </div>
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
  display: flex;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.app {
  position: relative;
  flex: 1;
}

.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 240px;
  display: flex;
  flex-direction: column;
}
.cnt {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;

  .cnt-wrapper {
    padding: 20px;
    background-color: #fff;
  }
}
</style>


