<template>
  <el-table :data="sales" border style="width:100%" header-row-class-name="table-header" v-loading="loading">
    <el-table-column label="功能版本" prop="name">
    </el-table-column>
    <el-table-column label="1个月" prop="one">
    </el-table-column>
    <el-table-column label="3个月" prop="three">
    </el-table-column>
    <el-table-column label="6个月" prop="six">
    </el-table-column>
    <el-table-column label="12个月" prop="twelve">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import currency from 'currency.js';
const format = value => {
  return currency(value, { symbol: '¥', precision: 0 }).format(true);
};
export default {
  computed: mapState('sales', {
    sales: state => {
      let data = state.getSales.data;
      let wrapper = [];
      if (data) {
        wrapper = [
          {
            name: '基础版（收费）',
            one: format(data.base1),
            three: format(data.base3),
            six: format(data.base6),
            twelve: format(data.base12)
          },
          {
            name: '店长版（收费）',
            one: format(data.adv1),
            three: format(data.adv3),
            six: format(data.adv6),
            twelve: format(data.adv12)
          }
        ];
      }
      return wrapper;
    },
    loading: state => state.getSales.loading
  }),
  mounted() {
    this.getSales();
  },
  methods: {
    ...mapActions('sales', ['getSales'])
  }
};
</script>
