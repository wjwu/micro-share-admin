<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleAdd">添加</el-button>
        <el-button type="primary" size="medium" @click="handleRefresh">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="ads" border style="width: 100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="物料" width="140">
        <template slot-scope="scope">
          <img :src="scope.row.src" style="width:120px;height:80px;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="物料名称"></el-table-column>
      <el-table-column label="跳转类型" width="120">
        <template slot-scope="scope">
          {{scope.row.jumpType | jumpType}}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="scope">
          {{scope.row.type==='IMG'?'图片':'视频'}}
        </template>
      </el-table-column>
      <el-table-column label="是否已使用" width="120">
        <template slot-scope="scope">
          {{scope.row.adPositionId?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          {{scope.row.editTime | timeFormatter}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="medium" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { OPEN_TAB } from '../../../common/js/events';
import { AD_EDIT, AD_ADD } from '../../../common/js/menus';
import MMessageBox from '../../components/MessageBox';

export default {
  computed: mapState('ad', {
    ads: state => state.getAds.data,
    total: state => state.getAds.total,
    loading: state => state.getAds.loading
  }),
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      addDialogVisible: false,
      selectedAdSite: null,
      editDialogVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('ad', ['getAds', 'delAd']),
    load() {
      this.getAds({
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
      await this.delAd(adId);
      this.load();
    },
    handleAdd() {
      this.$publish(OPEN_TAB, AD_ADD);
    },
    handleEdit(ad) {
      this.$publish(OPEN_TAB, AD_EDIT, ad.id, ad.name);
    }
  }
};
</script>
