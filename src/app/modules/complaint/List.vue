<template>
  <div>
    <el-form inline label-width="80px" :model="searchForm">
      <el-form-item label="名称">
        <el-input size="medium" v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item label="微信号：">
        <el-input size="medium" v-model="searchForm.wechatId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="complaints" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="名称" width="120" prop="name">
      </el-table-column>
      <el-table-column label="微信号" prop="wechatId">
      </el-table-column>
      <el-table-column label="人数" width="80" prop="count">
      </el-table-column>
      <el-table-column label="行业" width="80" prop="industry">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleView(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <user-dialog :visible.sync="complaintDialogVisible" :complaint="complaint" v-loading="detailLoading"></user-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserDialog from './components/UserDialog';

export default {
  components: {
    UserDialog
  },
  computed: mapState('complaint', {
    complaints: state => state.getComplaints.data,
    loading: state => state.getComplaints.loading,
    total: state => state.getComplaints.total,
    complaint: state => state.getComplaint.data,
    detailLoading: state => state.getComplaint.loading
  }),
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      searchForm: {
        name: '',
        wechatId: ''
      },
      complaintDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('complaint', ['getComplaints', 'getComplaint']),
    load() {
      let request = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        ...this.searchForm
      };
      this.getComplaints(request);
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleSearch() {
      this.pageIndex = 1;
      this.load();
    },
    handleView(id) {
      this.getComplaint(id);
      this.complaintDialogVisible = true;
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

