<template>
  <el-dialog title="编辑公告" :visible="visible" width="50%" :before-close="handleClose" @open="handleOpen">
    <el-form label-width="70px" :model="noticeForm" :rules="noticeRules" ref="noticeForm">
      <el-form-item label="标题：" prop="title">
        <el-input size="medium" placeholder="请输入标题" v-model="noticeForm.title" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="context">
        <el-input size="medium" type="textarea" rows="5" placeholder="请输入内容" v-model="noticeForm.context" maxlength="500">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="handleSubmit" :loading="loading">保存</el-button>
      <el-button size="medium" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    notice: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: mapState('notice', {
    loading: state => state.updateNotice.loading
  }),
  data() {
    return {
      noticeForm: {
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
    ...mapActions('notice', ['updateNotice']),
    handleOpen() {
      this.noticeForm.title = this.notice.title;
      this.noticeForm.context = this.notice.context;
      this.noticeForm.id = this.notice.id;
    },
    handleSubmit() {
      this.$refs.noticeForm.validate(async valid => {
        if (valid) {
          await this.updateNotice(this.noticeForm);
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

