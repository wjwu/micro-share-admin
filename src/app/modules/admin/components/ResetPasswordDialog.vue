<template>
  <el-dialog title="重置密码" :visible="visible" :before-close="handleClose" @open="handleOpen">
    <el-form :model="editForm" :rules="addRule" ref="editForm" label-width="100px">
      <el-form-item label="用户名">
        <el-input size="medium" v-model="editForm.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改密码" prop="password">
        <el-input size="medium" type="password" v-model="editForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input size="medium" type="password" v-model="editForm.rePassword"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" :loading="loading" @click="handleEdit">确 定</el-button>
      <el-button size="medium" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    account: {
      type: Object,
      required: true
    }
  },
  computed: mapState('admin', {
    loading: state => state.resetPassword.loading
  }),
  data() {
    const validatePasswordUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        this.$refs.editForm.validateField('rePassword');
        callback();
      }
    };
    const validateRePasswordUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.editForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      addRule: {
        password: [
          { required: true, validator: validatePasswordUser, trigger: 'change' }
        ],
        rePassword: [
          {
            required: true,
            validator: validateRePasswordUser,
            trigger: 'change'
          }
        ]
      },
      editForm: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions('admin', ['resetPassword']),
    handleOpen() {
      this.editForm.userName = this.account.userName;
      this.editForm.password = this.account.password;
    },
    handleClose() {
      this.$emit('update:visible', false);
      this.$refs.editForm.resetFields();
    },
    handleEdit() {
      this.$refs.editForm.validate().then(() => {
        this.resetPassword({
          password: this.editForm.password,
          id: this.account.id
        }).then(this.handleClose);
      });
    }
  }
};
</script>
