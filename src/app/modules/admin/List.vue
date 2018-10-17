<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="admins" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="姓名" prop="name">
      </el-table-column>
      <el-table-column label="账号" prop="userName">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button v-if="operator ==='admin'" type="text" size="medium" @click="handleReset(scope.row)">重置密码</el-button>
          <el-button v-if="operator !== scope.row.userName" type="text" size="medium" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination> -->
    <add-admin-dialog :visible.sync="addAdminDialogVisible"></add-admin-dialog>
    <reset-password-dialog :visible.sync="resetPasswordDialogVisible" :account="selectedAccount"></reset-password-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import session from '../../../common/js/session';
import AddAdminDialog from './components/AddAdminDialog';
import ResetPasswordDialog from './components/ResetPasswordDialog';

export default {
  components: {
    AddAdminDialog,
    ResetPasswordDialog
  },
  computed: mapState('admin', {
    admins: state => state.getAdmins.data,
    loading: state => state.getAdmins.loading
    // total: state => state.getAdmins.total
  }),
  data() {
    return {
      // pageSize: 9999,
      // currentPage: 1,
      operator: session.getString('operator'),
      addAdminDialogVisible: false,
      resetPasswordDialogVisible: false,
      selectedAccount: {}
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('admin', ['getAdmins', 'deleteAdmin']),
    load() {
      this.getAdmins({
        // pageSize: this.pageSize,
        // currentPage: this.currentPage
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleAdd() {
      this.addAdminDialogVisible = true;
    },
    handleReset(row) {
      this.selectedAccount = { ...row };
      this.resetPasswordDialogVisible = true;
    },
    async handleDelete(id) {
      await this.$confirm('您确实要删除该管理员？');
      this.deleteAdmin(id);
    }
  }
};
</script>

