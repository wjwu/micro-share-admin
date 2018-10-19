<template>
  <div>
    <el-table :data="tasks" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="用户ID" prop="userId" width="160px">
      </el-table-column>
      <el-table-column label="任务名称" prop="title" width="160px">
      </el-table-column>
      <el-table-column label="任务类型" width="90px">
        <template slot-scope="scope">
          {{scope.row.msgType | taskType}}
        </template>
      </el-table-column>
      <el-table-column label="内容" prop="text">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img class="task-image" :src="`${image}?imageView2/1/w/100/h/100/interlace/1/q/75`" v-for="(image,i) in scope.row.images" :key="i" />
        </template>
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
  computed: mapState('task', {
    tasks: state => state.getTasks.data,
    loading: state => state.getTasks.loading,
    total: state => state.getTasks.total
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
    ...mapActions('task', ['getTasks']),
    load() {
      this.getTasks({
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
.task-image{
  margin-right: 5px;
  margin-bottom: 5px;
  height: 100px;
  width: 100px;
}
</style>

