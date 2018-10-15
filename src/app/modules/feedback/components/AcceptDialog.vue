<template>
  <el-dialog title="采纳建议" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="120px" v-if="feedback" ref="feedbackForm">
      <el-form-item label="成员账号：">
        {{feedback.username}}
      </el-form-item>
      <el-form-item label="建议类型：">
        {{feedback.type}}
      </el-form-item>
      <el-form-item label="建议内容：">
        {{feedback.content}}
      </el-form-item>
      <el-form-item label="提交时间：">
        {{feedback.createTime | time}}
      </el-form-item>
      <el-form-item label="是否增加信用分">
        <el-radio-group v-model="score">
          <el-radio :label="0">不加分</el-radio>
          <el-radio :label="0.5">加0.5分</el-radio>
          <el-radio :label="1">加1分</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="handleAccept">采纳</el-button>
      <el-button size="medium" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    feedback: {
      type: Object
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: mapState('feedback', {
    loading: state => state.acceptFeedback.loading
  }),
  data() {
    return {
      score: 0
    };
  },
  methods: {
    ...mapActions('feedback', ['acceptFeedback']),
    async handleAccept() {
      await this.acceptFeedback({
        id: this.feedback.id,
        score: this.score
      });
      this.handleClose();
      this.$refs.feedbackForm.resetFields();
    },
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

