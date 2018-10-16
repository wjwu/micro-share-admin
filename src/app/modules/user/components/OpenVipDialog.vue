<template>
  <el-dialog title="开通管家" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="120px" ref="longForm">
      <el-form-item label="选择开通时长：">
        <el-radio-group v-model="month">
          <el-radio :label="1">1个月</el-radio>
          <el-radio :label="3">3个月</el-radio>
          <el-radio :label="6">6个月</el-radio>
          <el-radio :label="12">12个月</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="handleOpen" :loading="loading">开通</el-button>
      <el-button size="medium" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    vipType: {
      type: String,
      required: true
    }
  },
  computed: mapState('user', {
    loading: state => state.openUserVip.loading
  }),
  data() {
    return {
      month: 1
    };
  },
  methods: {
    ...mapActions('user', ['openUserVip']),
    handleClose() {
      this.$emit('update:visible', false);
    },
    async handleOpen() {
      await this.openUserVip({
        id: this.id,
        type: this.vipType,
        month: this.month
      });
      this.handleClose();
      this.$refs.longForm.resetField();
    }
  }
};
</script>

