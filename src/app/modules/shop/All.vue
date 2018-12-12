<template>
  <div>
    <el-row></el-row>
    <el-table :data="shops" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="Logo" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.logo" style="width:60px;height:60px;" />
        </template>
      </el-table-column>
      <el-table-column label="名称" width="160" prop="name">
      </el-table-column>
      <el-table-column label="地址" width="200" prop="address">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column label="操作" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleAudit(scope.row.id,true)">通过</el-button>
          <el-button type="text" size="medium" @click="handleAudit(scope.row.id,false)">拒绝</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('shop', {
      shops: state => state.getShops.data,
      loading: state => state.getShops.loading,
      total: state => state.getShops.total
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
    ...mapActions('shop', ['getShops']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
      this.getShops(request);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    }
  }
};
</script>

