<template>
  <div>
    <el-form inline label-width="100px" :model="searchForm">
      <el-form-item label="投诉人：">
        <el-input size="medium" v-model="searchForm.fromUserName"></el-input>
      </el-form-item>
      <el-form-item label="被投诉人：">
        <el-input size="medium" v-model="searchForm.toUserName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="complaints" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="投诉人" width="120" prop="fromName">
      </el-table-column>
      <el-table-column label="被投诉人" width="120" prop="toName">
      </el-table-column>
      <el-table-column label="投诉方描述" prop="content">
      </el-table-column>
      <el-table-column label="被投诉方描述" prop="refuseContent">
      </el-table-column>
      <el-table-column label="类型" width="140">
        <template slot-scope="scope">
          {{scope.row.type | compType}}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="140">
        <template slot-scope="scope">
          {{scope.row.status | compStatus}}
        </template>
      </el-table-column>
      <el-table-column label="客服处理意见" prop="handleContent">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleView(scope.row.id)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <!-- <user-dialog :visible.sync="complaintDialogVisible" :complaint="complaint" v-loading="detailLoading"></user-dialog> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import UserDialog from './components/UserDialog';

export default {
  // components: {
  //   UserDialog
  // },
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
      currentPage: 1,
      searchForm: {
        fromUserName: '',
        toUserName: ''
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
        currentPage: this.currentPage,
        ...this.searchForm
      };
      this.getComplaints(request);
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
      this.getComplaint(id);
      this.complaintDialogVisible = true;
    }
  }
};
</script>

