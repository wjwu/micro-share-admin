<template>
  <el-dialog title="订单详情" :visible="visible" width="50%" :before-close="handleClose">
    <el-row v-if="order">
      <el-col :span="12" v-if="order.originalOrder">
        <h3>订单信息：</h3>
        <el-form label-width="100px">
          <el-form-item label="订单编号：">
            {{order.originalOrder.number}}
          </el-form-item>
          <el-form-item label="创建时间：">
            {{order.originalOrder.createTime | time}}
          </el-form-item>
          <!-- <el-form-item label="服务费：">
            {{order.originalOrder.groupMemberCount | price}}
          </el-form-item> -->
          <el-form-item label="订单状态：">
            {{order.originalOrder.status | orderStatus}}
          </el-form-item>
          <el-form-item label="群名称：">
            {{order.originalOrder.groupName}}
          </el-form-item>
          <el-form-item label="群行业：">
            {{order.originalOrder.industry}}
          </el-form-item>
          <el-form-item label="群人数：">
            {{order.originalOrder.groupMemberCount}}
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" v-if="order.matchedOrder">
        <h3>商伴信息：</h3>
        <el-form label-width="100px">
          <el-form-item label="手机号：">
            {{order.matchedOrder.phone}}
          </el-form-item>
          <el-form-item label="微信号：">
            {{order.matchedOrder.wechat}}
          </el-form-item>
          <el-form-item label="订单状态：">
            {{order.matchedOrder.status | orderStatus}}
          </el-form-item>
          <el-form-item label="群名称：">
            {{order.matchedOrder.groupName}}
          </el-form-item>
          <el-form-item label="群行业：">
            {{order.matchedOrder.industry}}
          </el-form-item>
          <el-form-item label="群人数：">
            {{order.matchedOrder.groupMemberCount}}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
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

<style lang="scss" scoped>
.head-phone {
  height: 100px;
  width: 100px;
}
</style>

