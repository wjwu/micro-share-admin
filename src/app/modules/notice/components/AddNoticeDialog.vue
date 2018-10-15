<template>
  <el-dialog title="新增公告" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="70px" :model="notice" :rules="noticeRules" ref="noticeForm">
      <el-form-item label="标题：" prop="title">
        <el-input size="medium" placeholder="请输入标题" v-model="notice.title" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="context">
        <el-input size="medium" type="textarea" rows="5" placeholder="请输入内容" v-model="notice.context" maxlength="500">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="handleSubmit" :loading="loading">发布</el-button>
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
    }
  },
  computed: mapState('notice', {
    loading: state => state.addNotice.loading
  }),
  data() {
    return {
      notice: {
        title: '',
        context: ''
      },
      noticeRules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'change' }
        ],
        context: [
          { required: true, message: '请输入公告内容', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    ...mapActions('notice', ['addNotice']),
    handleSubmit() {
      this.$refs.noticeForm.validate(async valid => {
        if (valid) {
          await this.addNotice(this.notice);
          this.handleClose();
          this.$refs.noticeForm.resetFields();
        }
      });
    },
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

