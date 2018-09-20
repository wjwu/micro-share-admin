<template>
  <div>
    <el-table :data="ads" border style="width: 100%" header-row-class-name="table-header" v-loading="dataLoading">
      <el-table-column label="序号" width="50" type="index">
      </el-table-column>
      <el-table-column label="物料" width="140">
        <template slot-scope="scope">
          <img :src="scope.row.src" style="width:120px;height:80px;" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="物料名称"></el-table-column>
      <el-table-column label="更新时间" width="220">
        <template slot-scope="scope">
          {{scope.row.editTime | timeFormatter}}
        </template>
      </el-table-column>
      <el-table-column label="排序" width="120">
        <template slot-scope="scope">
          <div class="ad-arrow">
            <div>
              <el-button type="text" size="medium" @click="handleUUp(scope.row.id)">
                <i class="el-icon-d-arrow-left"></i>
              </el-button>
              <el-button type="text" size="medium" @click="handleDDown(scope.row.id)">
                <i class="el-icon-d-arrow-right"></i>
              </el-button>
            </div>
            <div>
              <el-button type="text" size="medium" @click="handleUp(scope.row.id)">
                <i class="el-icon-caret-top"></i>
              </el-button>
              <el-button type="text" size="medium" @click="handleDown(scope.row.id)">
                <i class="el-icon-caret-bottom"></i>
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="medium" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:22px;text-align:center">
      <el-button type="primary" size="medium" @click="handleAdd">新增</el-button>
      <el-button type="primary" size="medium" @click="handleSave" :loading="loading">保存</el-button>
    </div>
    <add-ad-dialog :visible.sync="addAdDialogVisible" @afterChoose="handleAfterChoose" :selectedAds="ads"></add-ad-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';
import MMessageBox from '../../../components/MessageBox';
import AddAdDialog from './components/AddAdDialog';
import { OPEN_TAB } from '../../../../common/js/events';
import { AD_EDIT } from '../../../../common/js/menus';

export default {
  components: {
    AddAdDialog
  },
  computed: mapState('ad', {
    loading: state => state.addRelation.loading,
    dataLoading: state => state.getRelationAds.loading
  }),
  data() {
    return {
      ads: [],
      addAdDialogVisible: false
    };
  },
  async mounted() {
    const ads = await this.getRelationAds(this.$route.params.id);
    this.ads = ads.adDTOList;
  },
  methods: {
    ...mapActions('ad', ['getRelationAds', 'addRelation']),
    ...mapActions('global', ['notifyError']),
    handleAdd() {
      this.addAdDialogVisible = true;
    },
    handleEdit(ad) {
      this.$publish(OPEN_TAB, AD_EDIT, ad.id, ad.name);
    },
    async handleDelete(id) {
      await MMessageBox.alert('您确定要删除该条记录？', '提示', {
        showCancelButton: true,
        showClose: true,
        type: 'warning'
      });
      const idx = this.ads.findIndex(item => item.id === id);
      const ads = _.cloneDeep(this.ads);
      ads.splice(idx, 1);
      this.ads = ads;
    },
    handleAfterChoose(items) {
      const addeds = this.ads.map(item => item.id);
      if (items.length > 0) {
        const ads = _.cloneDeep(this.ads);
        for (let item of items) {
          if (addeds.indexOf(item.id) < 0) {
            ads.push(item);
          }
        }
        this.ads = ads;
      }
    },
    handleUp(id) {
      const idx = this.ads.findIndex(item => item.id === id);
      const ads = _.cloneDeep(this.ads);
      if (idx !== 0) {
        const tmp = ads[idx];
        ads[idx] = ads[idx - 1];
        ads[idx - 1] = tmp;
        this.ads = ads;
      }
    },
    handleUUp(id) {
      const idx = this.ads.findIndex(item => item.id === id);
      const ads = _.cloneDeep(this.ads);
      if (idx !== 0) {
        const tmp = ads[idx];
        ads[idx] = ads[0];
        ads[0] = tmp;
        this.ads = ads;
      }
    },
    handleDown(id) {
      const idx = this.ads.findIndex(item => item.id === id);
      const ads = _.cloneDeep(this.ads);
      if (idx !== ads.length - 1) {
        const tmp = ads[idx];
        ads[idx] = ads[idx + 1];
        ads[idx + 1] = tmp;
        this.ads = ads;
      }
    },
    handleDDown(id) {
      const idx = this.ads.findIndex(item => item.id === id);
      const ads = _.cloneDeep(this.ads);
      if (idx !== ads.length - 1) {
        const tmp = ads[idx];
        ads[idx] = ads[ads.length - 1];
        ads[ads.length - 1] = tmp;
        this.ads = ads;
      }
    },
    async handleSave() {
      if (this.ads.length === 0) {
        this.notifyError('请至少选择一个物料');
        return;
      }
      const ads = [];
      let i = this.ads.length;
      for (let ad of this.ads) {
        ads.push({
          adId: ad.id,
          weight: i
        });
        i = i - 1;
      }
      await this.addRelation({
        adPositionId: this.$route.params.id,
        adWeightDtosList: ads
      });
    }
  }
};
</script>

<style lang="scss">
.ad-arrow {
  display: flex;

  .el-button + .el-button {
    margin-left: 0 !important;
  }
  .el-icon-d-arrow-left,
  .el-icon-d-arrow-right {
    transform: rotate(90deg);
  }

  div {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
  }
}
</style>


