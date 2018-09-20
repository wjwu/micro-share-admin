<template>
  <d-dialog :tabs="[AD_MANAGE]" title="选择物料" :visible="visible" width="60%" :before-close="handleClose" @open="handleOpen">
    <el-form label-width="0" inline>
      <el-form-item>
        <el-input size="medium" v-model="keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="ads" border style="width: 100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column prop="name" label="物料名称"></el-table-column>
      <el-table-column width="100" label="操作">
        <template slot-scope="scope">
          <el-checkbox @change="handleChange(scope.row)" v-model="scope.row.checked" :disabled="scope.row.disabled">选择</el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:10px;" v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" :page-sizes="[10]" layout="total, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <el-alert :title="`请选择至少一个物料`" type="error" v-if="showError" center :closable="false"></el-alert>
    <div slot="footer" class="dialog-footer" style="margin-top:30px;text-align:center">
      <el-button type="default" @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </d-dialog>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import DDialog from '../../../../components/Dialog';
import { AD_MANAGE } from '../../../../../common/js/menus';

export default {
  components: {
    DDialog
  },
  props: {
    visible: {
      type: Boolean
    },
    selectedAds: {
      type: Array,
      default: []
    }
  },
  computed: mapState('ad', {
    loading: state => state.getUnRelationAds.loading,
    total: state => state.getUnRelationAds.total
  }),
  data() {
    return {
      AD_MANAGE,
      ads: [],
      keyword: '',
      pageIndex: 1,
      pageSize: 10,
      showError: false
    };
  },
  methods: {
    ...mapActions('ad', ['getUnRelationAds']),
    async load() {
      const ads = await this.getUnRelationAds({
        adPositionId: this.$route.params.id,
        name: this.keyword,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      const selectedIds = this.selectedAds.map(item => item.id);
      this.ads = ads.map(item => {
        if (selectedIds.indexOf(item.id) >= 0) {
          item.checked = true;
          item.disabled = true;
        } else {
          item.checked = false;
          item.disabled = false;
        }
        return item;
      });
    },
    handleOpen() {
      this.load();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.load();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleSearch() {
      this.pageIndex = 1;
      this.load();
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
    handleChange(row) {
      this.showError = false;
      for (let ad of this.ads) {
        if (ad.id === row.id) {
          ad.checked = row.checked;
        }
      }
      this.ads = _.cloneDeep(this.ads);
    },
    handleSave() {
      let selectedAds = this.ads.filter(item => item.checked);
      if (selectedAds.length > 0) {
        this.$emit('afterChoose', selectedAds);
        this.handleClose();
      } else {
        this.showError = true;
      }
    }
  }
};
</script>

