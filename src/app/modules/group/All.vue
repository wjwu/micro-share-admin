<template>
  <div>
    <el-row>
      <el-form label-width="80px" :model="searchForm">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="名称：">
            <el-input size="medium" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="人数：">
            <el-select size="medium" v-model="searchForm.people" style="width:100%">
              <el-option label="全部" value="0-9999"></el-option>
              <el-option label="0-100" value="0-100"></el-option>
              <el-option label="100-200" value="100-200"></el-option>
              <el-option label="200-300" value="200-300"></el-option>
              <el-option label="300-400" value="300-400"></el-option>
              <el-option label="400-500" value="400-500"></el-option>
              <el-option label="500以上" value="500-9999"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="行业：">
            <el-select size="medium" v-model="searchForm.industryId" style="width:100%">
              <el-option label="全部" value=""></el-option>
              <el-option label="食品餐饮" value="1"></el-option>
              <el-option label="水果生鲜" value="2"></el-option>
              <el-option label="百货家电" value="3"></el-option>
              <el-option label="服饰母婴" value="4"></el-option>
              <el-option label="箱包美妆" value="5"></el-option>
              <el-option label="汽车家居" value="6"></el-option>
              <el-option label="文化教育" value="7"></el-option>
              <el-option label="休闲娱乐" value="8"></el-option>
              <el-option label="医疗保健" value="9"></el-option>
              <el-option label="其他" value="10"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="城市：">
            <el-cascader size="medium" v-model="region" :options="regions" clearable style="width:100%">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item>
            <el-button type="primary" size="medium" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="groups" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
      <el-table-column label="名称" width="160" prop="name">
      </el-table-column>
      <el-table-column label="微信号" width="180" prop="wechatId">
      </el-table-column>
      <el-table-column label="人数" width="80" prop="count">
      </el-table-column>
      <el-table-column label="行业" width="100" prop="industry">
      </el-table-column>
      <el-table-column label="位置" width="180" prop="location" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="描述" prop="desc">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{scope.row.createTime | time}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="handleView(scope.row.id)">详情</el-button>
          <el-button type="text" size="medium" @click="handleViewUser(scope.row.userId)">查看用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total" class="table-page">
    </el-pagination>
    <group-dialog :visible.sync="groupDialogVisible" :group="group" v-loading="groupLoading"></group-dialog>
    <user-dialog :visible.sync="userDialogVisible" :user="user" v-loading="userLoading"></user-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import GroupDialog from './components/GroupDialog';
import UserDialog from './components/UserDialog';
import regions from '../../utils/regions';

export default {
  components: {
    GroupDialog,
    UserDialog
  },
  computed: {
    ...mapState('group', {
      groups: state => state.getGroups.data,
      loading: state => state.getGroups.loading,
      total: state => state.getGroups.total,
      group: state => state.getGroup.data,
      groupLoading: state => state.getGroup.loading
    }),
    ...mapState('user', {
      user: state => state.getUser.data,
      userLoading: state => state.getUser.loading
    })
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      searchForm: {
        name: '',
        people: '0-9999',
        industryId: ''
      },
      region: [],
      regions: [],
      groupDialogVisible: false,
      userDialogVisible: false
    };
  },
  created() {
    this.regions = regions
      .filter(item => item.code.endsWith('0000'))
      .map(item => {
        let provinceCode = item.code.substring(0, 2);
        let children = regions.filter(
          child =>
            child.code.startsWith(provinceCode) &&
            child.code.endsWith('00') &&
            child.code !== item.code
        );
        children = children.map(child => {
          return { label: child.name, value: child.name };
        });
        return { label: item.name, value: item.name, children };
      });
  },
  mounted() {
    this.load();
  },
  methods: {
    ...mapActions('group', ['getGroups', 'getGroup']),
    ...mapActions('user', ['getUser']),
    load() {
      let request = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        name: this.searchForm.name,
        peopleSizeStart: this.searchForm.people.split('-')[0],
        peopleSizeEnd: this.searchForm.people.split('-')[1],
        industryId: this.searchForm.industryId,
        cityName: this.region[1] || ''
      };
      this.getGroups(request);
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
      this.getGroup(id);
      this.groupDialogVisible = true;
    },
    handleViewUser(id) {
      this.getUser(id);
      this.userDialogVisible = true;
    }
  }
};
</script>

