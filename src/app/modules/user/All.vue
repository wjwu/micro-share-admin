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
        <el-input size="medium" v-model="searchForm.wechatId"></el-input>
      </el-form-item>
      <el-form-item label="用户ID：">
        <el-input size="medium" v-model="searchForm.userId"></el-input>
      </el-form-item>
      <el-form-item label="信用分：">
        <el-select size="medium" v-model="searchForm.scoreStart" style="width:80px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="0" value="0"></el-option>
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
        <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
        <el-select size="medium" v-model="searchForm.scoreEnd" style="width:80px;">
          <el-option label="全部" value=""></el-option>
          <el-option label="0" value="0"></el-option>
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
          <el-button type="text" size="medium" @click="handleView(scope.row.id)">详情</el-button>
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
        wechatId: '',
        phone: '',
        userId: '',
        scoreStart: '',
        scoreEnd: ''
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

