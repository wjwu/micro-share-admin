<template>
  <div>
    <el-form inline :model="searchForm">
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="notices" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="标题" width="120" prop="title">
      </el-table-column>
      <el-table-column label="内容" prop="context" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="发布时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="medium" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <add-notice-dialog :visible.sync="addNoticeDialogVisible"></add-notice-dialog>
    <edit-notice-dialog :visible.sync="editNoticeDialogVisible" :notice="notice"></edit-notice-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddNoticeDialog from './components/AddNoticeDialog';
import EditNoticeDialog from './components/EditNoticeDialog';

export default {
  components: {
    AddNoticeDialog,
    EditNoticeDialog
  },
  computed: mapState('notice', {
    notices: state => state.getNotices.data,
    loading: state => state.getNotices.loading || state.deleteNotice.loading,
    total: state => state.getNotices.total
  }),
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        name: '',
        wechatId: ''
      },
      addNoticeDialogVisible: false,
      notice: {},
      editNoticeDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('notice', ['getNotices', 'deleteNotice']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        ...this.searchForm
      };
      this.getNotices(request);
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
    handleAdd() {
      this.addNoticeDialogVisible = true;
    },
    handleEdit(row) {
      this.notice = { ...row };
      this.editNoticeDialogVisible = true;
    },
    async handleDelete(id) {
      await this.$confirm('您确实要删除该条公告？');
      this.deleteNotice({ id });
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

