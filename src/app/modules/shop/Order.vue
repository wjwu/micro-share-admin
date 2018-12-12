<template>
  <div>
    <el-row></el-row>
    <el-table :data="orders" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="订单号" width="160" prop="number">
      </el-table-column>
      <el-table-column label="支付金额" width="100" prop="price">
      </el-table-column>
      <el-table-column label="优惠金额" width="100" prop="coupon">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <el-table-column label="收货人手机" prop="phone" width="120">
      </el-table-column>
      <el-table-column label="收货地址" prop="address" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleView(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <order-dialog :visible.sync="orderDialogVisible" :order="order"></order-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import OrderDialog from './components/OrderDialog';

export default {
  components: {
    OrderDialog
  },
  computed: {
    ...mapState('shop', {
      orders: state => state.getOrders.data,
      loading: state => state.getOrders.loading,
      total: state => state.getOrders.total
    })
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {},
      order: null,
      orderDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('shop', ['getOrders']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
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
    handleView(order) {
      this.order = order;
      this.orderDialogVisible = true;
    }
  }
};
</script>

