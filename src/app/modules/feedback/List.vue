<template>
  <div>
    <el-form inline label-width="80px" :model="searchForm">
      <!-- <el-form-item label="用户名：">
        <el-input size="medium" v-model="searchForm.name"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="微信号：">
        <el-input size="medium" v-model="searchForm.wechatId"></el-input>
      </el-form-item> -->
      <!-- <el-form-item>
        <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
      </el-form-item> -->
    </el-form>
    <el-table :data="feedbacks" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="成员账号" width="120" prop="username">
      </el-table-column>
      <el-table-column label="建议类型" width="160" prop="type">
      </el-table-column>
      <el-table-column label="建议内容" prop="content" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="提交时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{scope.row.status | feedbackStatus}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'SUBMIT'" type="text" size="medium" @click="handleAccept(scope.row)">采纳</el-button>
          <el-button v-if="scope.row.status === 'SUBMIT'" type="text" size="medium" @click="handleRefuse(scope.row.id)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <accept-dialog :visible.sync="acceptDialogVisible" :feedback="feedback"></accept-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AcceptDialog from './components/AcceptDialog';

export default {
  components: {
    AcceptDialog
  },
  computed: mapState('feedback', {
    feedbacks: state => state.getFeedbacks.data,
    loading: state =>
      state.getFeedbacks.loading || state.refuseFeedback.loading,
    total: state => state.getFeedbacks.total
  }),
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        // name: '',
        // wechatId: ''
      },
      feedback: null,
      acceptDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('feedback', ['getFeedbacks', 'refuseFeedback']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        ...this.searchForm
      };
      this.getFeedbacks(request);
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
    handleAccept(row) {
      this.feedback = { ...row };
      this.acceptDialogVisible = true;
    },
    async handleRefuse(id) {
      await this.$confirm('您确定要拒绝该条建议？');
      this.refuseFeedback(id);
    }
  }
};
</script>

