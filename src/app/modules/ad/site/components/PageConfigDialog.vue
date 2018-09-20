<template>
  <d-dialog :tabs="[AD_ADD,AD_EDIT]" :title="title" :visible="visible" width="60%" :before-close="handleClose">
    <el-form ref="searchForm" :model="searchForm" :rules="searchRules" label-width="0" inline>
      <el-form-item>
        <el-input size="medium" v-model="searchForm.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pages" border style="width: 100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column abel="标题/名称">
        <template slot-scope="scope">
          {{scope.row.companyName || scope.row.title || scope.row.name || scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column width="100" label="操作">
        <template slot-scope="scope">
          <el-checkbox @change="handleChange(scope.row)" v-model="scope.row.checked">选择</el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="pages && pages.length > 0" style="text-align:right;margin-top:10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" :page-sizes="[5]" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-alert :title="`请${title}`" type="error" v-if="showError" center :closable="false"></el-alert>
    <div slot="footer" class="dialog-footer">
      <el-button type="default" @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </d-dialog>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import DDialog from '../../../../components/Dialog';
import { AD_ADD, AD_EDIT } from '../../../../../common/js/menus';

export default {
  props: {
    visible: {
      type: Boolean
    },
    plate: {
      type: String,
      required: true
    }
  },
  components: {
    DDialog
  },
  computed: mapState('ad', {
    loading: state => state.getTargets.loading,
    total: state => state.getTargets.total
  }),
  watch: {
    plate(curVal) {
      this.searchForm.plate = curVal;
      if (curVal === 'ITEM_INFO') {
        this.title = '选择商品';
      } else if (curVal === 'SHOP') {
        this.title = '选择店铺';
      } else if (curVal === 'MEDIA') {
        this.title = '选择专栏';
      } else if (curVal === 'ARTICLE') {
        this.title = '选择文章';
      } else if (curVal === 'ALBUM') {
        this.title = '选择专辑';
      } else if (curVal === 'QA') {
        this.title = '选择问答';
      } else {
        this.title = '';
      }
    }
  },
  data() {
    return {
      AD_ADD,
      AD_EDIT,
      title: '',
      searchForm: {
        plate: '',
        keyword: ''
      },
      searchRules: {
        plate: [{ required: true, message: '请选择板块', trigger: 'change' }]
      },
      pageSize: 5,
      pageIndex: 1,
      pages: [],
      showError: false
    };
  },
  created() {
    this.searchForm.plate = this.plate;
    if (this.plate === 'ITEM_INFO') {
      this.title = '选择商品';
    } else if (this.plate === 'SHOP') {
      this.title = '选择店铺';
    } else if (this.plate === 'MEDIA') {
      this.title = '选择专栏';
    } else if (this.plate === 'ARTICLE') {
      this.title = '选择文章';
    } else if (this.plate === 'ALBUM') {
      this.title = '选择专辑';
    } else if (this.plate === 'QA') {
      this.title = '选择问答';
    } else {
      this.title = '';
    }
  },
  methods: {
    ...mapActions('ad', ['getTargets']),
    async load() {
      const result = await this.getTargets({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        ...this.searchForm
      });
      this.pages = result.map(item => {
        item.checked = false;
        return item;
      });
    },
    handleClose() {
      this.pageSize = 5;
      this.pageIndex = 1;
      this.keyword = '';
      this.pages = [];
      this.$emit('update:visible', false);
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
      this.$refs.searchForm.validate().then(() => {
        this.pageIndex = 1;
        this.load();
      });
    },
    handleChange(row) {
      this.showError = false;
      for (let page of this.pages) {
        if (page.id !== row.id) {
          page.checked = false;
        } else {
          page.checked = true;
        }
      }
      this.pages = _.cloneDeep(this.pages);
    },
    handleSave() {
      let checked = false;
      for (let page of this.pages) {
        if (page.checked) {
          checked = true;
          this.$emit('afterChoose', {
            objectId: page.id,
            plate: this.searchForm.plate,
            title: page.companyName || page.title || page.name || page.content
          });
          this.handleClose();
          break;
        }
      }
      this.showError = !checked;
    }
  }
};
</script>

