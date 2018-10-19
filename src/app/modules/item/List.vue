<template>
  <div>
    <el-table :data="items" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="用户Id" prop="userId" width="160px">
      </el-table-column>
      <el-table-column label="商品名称" prop="name" width="160px">
      </el-table-column>
      <el-table-column label="商品图片" width="550">
        <template slot-scope="scope">
          <img class="product-image" :src="`${image}?imageView2/1/w/100/h/100/interlace/1/q/75`" v-for="(image,i) in scope.row.images" :key="i" />
        </template>
      </el-table-column>
       <el-table-column label="商品描述" prop="description">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
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
  computed: mapState('item', {
    items: state => state.getItems.data,
    loading: state => state.getItems.loading,
    total: state => state.getItems.total
  }),
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('item', ['getItems']),
    load() {
      this.getItems({
        pageSize: this.pageSize,
        currentPage: this.currentPage
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
  }
};
</script>

<style lang="scss" scoped>
.product-image{
  margin-right: 5px;
  margin-bottom: 5px;
  height: 100px;
  width: 100px;
}
</style>


