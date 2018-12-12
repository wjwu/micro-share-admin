<template>
  <el-dialog title="订单详情" :visible="visible" width="60%" :before-close="handleClose">
    <el-tabs v-if="order">
      <el-tab-pane label="基本信息">
        <el-form label-width="100px">
          <el-form-item label="订单编号：">
            {{order.number}}
          </el-form-item>
          <el-form-item label="创建时间：">
            {{order.createTime | time}}
          </el-form-item>
          <el-form-item label="支付金额：">
            {{order.price}}
          </el-form-item>
          <el-form-item label="优惠金额：">
            {{order.coupon}}
          </el-form-item>
          <el-form-item label="收货人手机：">
            {{order.phone}}
          </el-form-item>
          <el-form-item label="收货地址：">
            {{order.address}}
          </el-form-item>
          <el-form-item label="购买店铺：">
            {{order.shopName}}
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品信息">
        <el-table :data="order.buyerOrderItemList" border style="width:100%" header-row-class-name="table-header">
          <el-table-column label="图片" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.img" style="width:60px;height:60px;" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="title">
          </el-table-column>
          <el-table-column label="价格" width="80" prop="price">
          </el-table-column>
          <el-table-column label="数量" width="80" prop="num">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

