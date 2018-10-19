<template>
  <el-dialog :title="`${this.accept ? '采纳' : '拒绝'}建议`" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="130px" :model="feedbackForm" ref="feedbackForm" :rules="feedbackFormRules">
      <el-form-item label="是否增加信用分：" v-if="accept">
        <el-radio-group v-model="feedbackForm.score">
          <el-radio :label="0">不加分</el-radio>
          <el-radio :label="0.5">加0.5分</el-radio>
          <el-radio :label="1">加1分</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="反馈意见：" prop="reply">
        <el-input size="medium" type="textarea" rows="5" placeholder="请输入内容" v-model="feedbackForm.reply" maxlength="500">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="handleAccept">{{this.accept ? '采纳' : '拒绝'}}</el-button>
      <el-button size="medium" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    feedbackId: {
      type: String
    },
    visible: {
      type: Boolean,
      required: true
    },
    accept: {
      type: Boolean
    }
  },
  computed: mapState('feedback', {
    loading: state => state.acceptFeedback.loading
  }),
  data() {
    return {
      feedbackForm: {
        score: 0,
        reply: ''
      },
      feedbackFormRules: {
        reply: [
          { required: true, message: '请输入反馈意见', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    ...mapActions('feedback', ['acceptFeedback', 'refuseFeedback']),
    async handleAccept() {
      this.$refs.feedbackForm.validate().then(async () => {
        if (this.accept) {
          await this.acceptFeedback({
            id: this.feedbackId,
            ...this.feedbackForm
          });
        } else {
          await this.refuseFeedback({
            id: this.feedbackId,
            ...this.feedbackForm
          });
        }
        this.handleClose();
        this.$refs.feedbackForm.resetFields();
      });
    },
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
