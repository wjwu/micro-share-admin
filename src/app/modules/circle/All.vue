<template>
  <div>
    <el-row></el-row>
    <el-table :data="circles" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="名称" width="160" prop="name">
      </el-table-column>
      <el-table-column label="人数" width="80" prop="groupNum">
      </el-table-column>
      <el-table-column label="行业" width="100" prop="industry">
      </el-table-column>
      <el-table-column label="主题" width="200" prop="subject">
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          {{scope.row.status | status}}
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleAudit(scope.row.id,true)">通过</el-button>
          <el-button type="text" size="medium" @click="handleAudit(scope.row.id,false)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('circle', {
      circles: state => state.getCircles.data,
      loading: state => state.getCircles.loading,
      total: state => state.getCircles.total
    })
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {}
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('circle', ['getCircles', 'updateCircle']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.getCircles(request);
    },
    handleAudit(id, result) {
      let msg;
      if (result) {
        msg = '您确定要审核通过该圈子？';
      } else {
        msg = '您确定要审核失败该圈子？';
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateCircle({
          id,
          type: result ? 'success' : 'failed'
        });
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    }
  },
  filters: {
    status(val) {
      switch (val) {
        case 'COMMIT':
          return '已提交';
        case 'PASS':
          return '审核通过';
        case 'FAILED':
          return '审核失败';
        case 'OFFICIAL':
          return '正式圈子';
        default:
          return '';
      }
    }
  }
};
</script>

