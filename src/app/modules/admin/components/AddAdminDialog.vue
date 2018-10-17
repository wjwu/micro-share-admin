<template>
  <el-dialog title="新增管理员" :visible="visible" width="50%" :before-close="handleClose">
    <el-form label-width="100px" :model="adminForm" :rules="adminRules" ref="adminForm">
      <el-form-item label="姓名：" prop="name">
        <el-input size="medium" placeholder="请输入姓名" v-model="adminForm.name" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="账号：" prop="userName">
        <el-input size="medium" placeholder="请输入账号" v-model="adminForm.userName" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input size="medium" type="password" placeholder="请输入密码" v-model="adminForm.password" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="rePassword">
        <el-input size="medium" type="password" placeholder="请输入确认密码" v-model="adminForm.rePassword" maxlength="50"></el-input>
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
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: mapState('admin', {
    loading: state => state.addAdmin.loading
  }),
  data() {
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        this.$refs.adminForm.validateField('rePassword');
        callback();
      }
    };
    const validateRePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.adminForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      adminForm: {
        name: '',
        userName: '',
        password: '',
        rePassword: ''
      },
      adminRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        userName: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'change' }
        ],
        rePassword: [
          { required: true, validator: validateRePassword, trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    ...mapActions('admin', ['addAdmin']),
    handleSubmit() {
      this.$refs.adminForm.validate(async valid => {
        if (valid) {
          await this.addAdmin(this.adminForm);
          this.handleClose();
          this.$refs.adminForm.resetFields();
        }
      });
    },
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>
