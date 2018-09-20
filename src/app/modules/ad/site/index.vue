<template>
  <div>
    <el-form>
      <el-form-item>
        <!-- <el-button type="primary" size="medium" @click="handleAdd">添加</el-button> -->
        <el-button type="primary" size="medium" @click="handleRefresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="ads" border style="width: 100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column prop="position" label="位置" width="160"></el-table-column>
      <el-table-column prop="name" label="广告位名称"></el-table-column>
      <el-table-column label="更新时间" width="220">
        <template slot-scope="scope">
          {{scope.row.editTime | timeFormatter}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleEdit(scope.row)">修改名称</el-button>
          <el-button type="text" size="medium" @click="handleManage(scope.row)">管理广告</el-button>
          <!-- <el-button type="text" size="medium" @click="handleDelete(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <site-name-dialog :visible.sync="editDialogVisible" :site="selectedAdSite" @updated="handleRefresh"></site-name-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { OPEN_TAB } from '../../../../common/js/events';
import {
  AD_SITE_ADD,
  // AD_SITE_EDIT,
  AD_MANAGE
} from '../../../../common/js/menus';
import MMessageBox from '../../../components/MessageBox';
import SiteNameDialog from './components/SiteNameDialog';

export default {
  components: {
    SiteNameDialog
  },
  computed: mapState('ad', {
    ads: state => state.getPositions.data,
    loading: state => state.getPositions.loading,
    total: state => state.getPositions.total
  }),
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      selectedAdSite: {},
      editDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('ad', ['getPositions', 'delPosition']),
    load() {
      this.getPositions({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleRefresh() {
      this.load();
    },
    async handleDelete(adId) {
      await MMessageBox.alert('您确定要删除该条记录？', '提示', {
        showCancelButton: true,
        showClose: true,
        type: 'warning'
      });
      await this.delPosition(adId);
      this.load();
    },
    handleAdd() {
      this.$publish(OPEN_TAB, AD_SITE_ADD);
    },
    handleEdit(site) {
      this.editDialogVisible = true;
      this.selectedAdSite = site;
      // this.$publish(OPEN_TAB, AD_SITE_EDIT, site.id, site.name);
    },
    handleManage(site) {
      this.$publish(OPEN_TAB, AD_MANAGE, site.id, site.name);
    }
  }
};
</script>
