<template>
  <div>
    <el-form inline label-width="80px" :model="searchForm">
      <el-form-item label="用户名：">
        <el-input size="medium" v-model="searchForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input size="medium" v-model="searchForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="微信号：">
        <el-input size="medium" v-model="searchForm.wechat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="users" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="头像" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.headPhoto" class="head-phone" />
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="120" prop="userName">
      </el-table-column>
      <el-table-column label="手机号" width="120" prop="phone">
      </el-table-column>
      <el-table-column label="微信号" prop="wechatId">
      </el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{scope.row.sex | sex}}
        </template>
      </el-table-column>
      <el-table-column label="信用分" width="80" prop="creditScore">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleView(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <user-dialog :visible.sync="userDialogVisible" :user="user" v-loading="detailLoading"></user-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserDialog from './components/UserDialog';

export default {
  components: {
    UserDialog
  },
  computed: mapState('user', {
    users: state => state.getUsers.data,
    loading: state => state.getUsers.loading,
    total: state => state.getUsers.total,
    user: state => state.getUser.data,
    detailLoading: state => state.getUser.loading
  }),
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        userName: '',
        wechat: '',
        phone: ''
      },
      userDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('user', ['getUsers', 'getUser']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        ...this.searchForm
      };
      this.getUsers(request);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleSearch() {
      this.currentPage = 1;
      this.load();
    },
    handleView(id) {
      this.getUser(id);
      this.userDialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.head-phone {
  height: 60px;
  width: 60px;
}
</style>

