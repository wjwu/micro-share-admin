<template>
  <el-dialog title="用户详情" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="100px" v-if="user">
      <el-form-item label="头像：">
        <img :src="user.headPhoto" class="head-phone" />
      </el-form-item>
      <el-form-item label="用户名：">
        {{user.userName}}
      </el-form-item>
      <el-form-item label="手机号：">
        {{user.phone}}
      </el-form-item>
      <el-form-item label="微信号：">
        {{user.wechat}}
      </el-form-item>
      <el-form-item label="性别：">
        {{user.sex}}
      </el-form-item>
      <el-form-item label="信用分：">
        {{user.creditScore}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.head-phone {
  height: 100px;
  width: 100px;
}
</style>

