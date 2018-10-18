<template>
  <el-table :data="data" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
    <el-table-column label="成员类型" prop="name">
    </el-table-column>
    <el-table-column label="周" prop="week">
    </el-table-column>
    <el-table-column label="月" prop="month">
    </el-table-column>
    <el-table-column label="季度" prop="season">
    </el-table-column>
    <el-table-column label="总计" prop="all">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: mapState('user', {
    data: state => {
      let data = state.getCount.data;
      let wrapeper = [];
      if (data) {
        wrapeper = [
          {
            name: '部落注册成员',
            week: data.registUser.week,
            month: data.registUser.month,
            season: data.registUser.season,
            all: data.registUser.all
          },
          {
            name: '参与匹配成员',
            week: data.allMatchingUser.week,
            month: data.allMatchingUser.month,
            season: data.allMatchingUser.season,
            all: data.allMatchingUser.all
          },
          {
            name: '匹配成功成员',
            week: data.matchSuccessUser.week,
            month: data.matchSuccessUser.month,
            season: data.matchSuccessUser.season,
            all: data.matchSuccessUser.all
          },
          {
            name: '等待匹配成员',
            week: data.matchOngoingUser.week,
            month: data.matchOngoingUser.month,
            season: data.matchOngoingUser.season,
            all: data.matchOngoingUser.all
          },
          {
            name: '管家购买成员',
            week: data.vipUser.week,
            month: data.vipUser.month,
            season: data.vipUser.season,
            all: data.vipUser.all
          }
        ];
      }
      return wrapeper;
    },
    loading: state => state.getCount.loading
  }),
  mounted() {
    this.getCount();
  },
  methods: {
    ...mapActions('user', ['getCount'])
  }
};
</script>

