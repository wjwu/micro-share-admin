<template>
  <el-dialog title="开通管家" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="120px" ref="longForm">
      <el-form-item label="开通数量：" v-if="vipType==='BASE'">
        <el-select size="medium" v-model="size">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option>
          <el-option label="10" value="10"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择开通时长：">
        <el-radio-group v-model="day">
          <el-radio :label="14">两周</el-radio>
          <el-radio :label="30">1个月</el-radio>
          <el-radio :label="90">3个月</el-radio>
          <el-radio :label="180">6个月</el-radio>
          <el-radio :label="360">12个月</el-radio>
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
      size: 1,
      day: 14
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
        day: this.day,
        size: this.size
      });
      this.handleClose();
      this.size = 1;
      this.day = 14;
      this.$refs.longForm.resetField();
    }
  }
};
</script>

