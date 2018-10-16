<template>
  <div>
    <el-form inline label-width="80px" :model="searchForm">
      <el-form-item label="用户名：">
        <el-input size="medium" v-model="searchForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="微信号：">
        <el-input size="medium" v-model="searchForm.wechatId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="users" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="用户名" prop="userName">
      </el-table-column>
      <el-table-column label="微信号" prop="wechatId">
      </el-table-column>
      <el-table-column label="管家类型">
        <el-table-column label="基础模块">
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              {{ scope.row.baseVipExpire | status}}
            </template>
          </el-table-column>
          <el-table-column label="过期时间" width="160">
            <template slot-scope="scope">
              {{ scope.row.baseVipExpire | time}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="handleClick($event,'基础模块',scope.row)">{{getBtnText(scope.row.baseVipExpire)}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="店长模块">
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              {{ scope.row.advVipExpire | status}}
            </template>
          </el-table-column>
          <el-table-column label="过期时间" width="160">
            <template slot-scope="scope">
              {{ scope.row.advVipExpire | time}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="handleClick($event,'店长模块',scope.row)">{{getBtnText(scope.row.advVipExpire)}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <open-vip-dialog :visible.sync="vipDialogVisible" :id="selectedUserId" :vip-type="selectedType"></open-vip-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import OpenVipDialog from './components/OpenVipDialog';

export default {
  components: {
    OpenVipDialog
  },
  computed: mapState('user', {
    users: state => state.getUsers.data,
    loading: state => state.getUsers.loading || state.closeUserVip.loading,
    total: state => state.getUsers.total
  }),
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        userName: '',
        wechatId: ''
      },
      vipDialogVisible: false,
      selectedUserId: '',
      selectedType: ''
    };
  },
  methods: {
    ...mapActions('user', ['getUsers', 'closeUserVip']),
    ...mapActions('global', ['notifyError']),
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
      if (!this.searchForm.userName && !this.searchForm.wechatId) {
        this.notifyError('请输入至少一项查询条件');
      } else {
        this.currentPage = 1;
        this.load();
      }
    },
    getBtnText(time) {
      if (!time) {
        return '开通';
      }
      return '关闭';
    },
    async handleClick(e, type, row) {
      if (e.target.innerText === '关闭') {
        await this.$confirm(`您确定要关闭该用户${type}管家？`);
        this.closeUserVip({
          id: row.id,
          type: type === '基础模块' ? 'BASE' : 'ADV'
        });
      } else {
        this.selectedUserId = row.id;
        if (type === '基础模块') {
          this.selectedType = 'BASE';
        } else {
          this.selectedType = 'ADV';
        }
        this.vipDialogVisible = true;
      }
    }
  },
  filters: {
    status(val) {
      if (!val) {
        return '未开通';
      }
      if (new Date().getTime() > val) {
        return '已过期';
      } else {
        return '正常';
      }
    }
  }
};
</script>
