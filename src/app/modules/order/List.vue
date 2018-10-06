<template>
  <div>
    <el-form inline label-width="80px" :model="searchForm">
      <el-form-item label="名称：">
        <el-input size="medium" v-model="searchForm.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="微信号：">
        <el-input size="medium" v-model="searchForm.wechatId"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="orders" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="名称" prop="groupName">
      </el-table-column>
      <el-table-column label="微信号" width="220" prop="wechat">
      </el-table-column>
      <el-table-column label="人数" width="100" prop="groupMemberCount">
      </el-table-column>
      <el-table-column label="行业" width="100" prop="industry">
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          {{scope.row.status | orderStatus}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleView(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <order-dialog :visible.sync="orderDialogVisible" :order="order" v-loading="detailLoading"></order-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import OrderDialog from './components/OrderDialog';

export default {
  components: {
    OrderDialog
  },
  computed: mapState('order', {
    orders: state => state.getOrders.data,
    loading: state => state.getOrders.loading,
    total: state => state.getOrders.total,
    order: state => state.getOrder.data,
    detailLoading: state => state.getOrder.loading
  }),
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        name: '',
        wechatId: ''
      },
      orderDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('order', ['getOrders', 'getOrder']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        ...this.searchForm
      };
      this.getOrders(request);
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
      this.getOrder(id);
      this.orderDialogVisible = true;
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

