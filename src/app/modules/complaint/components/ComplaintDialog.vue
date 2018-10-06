<template>
  <el-dialog title="投诉详情" :visible.sync="visible" width="60%" :before-close="handleClose">
    <el-row v-if="complaint">
      <el-col :span="12">
        <el-form label-width="100px">
          <el-form-item label="投诉人：">
            {{complaint.fromName}}
          </el-form-item>
          <el-form-item label="投诉内容：">
            {{complaint.content}}
          </el-form-item>
          <el-form-item label="投诉资料：">
            <img class="comp-image" v-for="(image,i) in getImages(complaint.imgs)" :key="i" :src="image" />
          </el-form-item>
          <el-form-item label="订单号：">
            {{complaint.orderNo}}
          </el-form-item>
          <el-form-item label="类型：">
            {{complaint.type | compType}}
          </el-form-item>
          <el-form-item label="状态：">
            {{complaint.status | compStatus}}
          </el-form-item>
          <el-form-item label="创建时间：">
            {{complaint.createTime | time}}
          </el-form-item>
          <el-form-item label="更新时间：">
            {{complaint.updateTime | time}}
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form label-width="100px">
          <el-form-item label="被投诉人：">
            {{complaint.toName}}
          </el-form-item>
          <el-form-item label="不承认内容：">
            {{complaint.refuseContent}}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" size="medium" @click="handleSuccess" :loading="loading">处理成功</el-button>
      <el-button type="danger" size="medium" @click="handleRefuse" :loading="loading">处理拒绝</el-button>
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    complaint: {
      type: Object
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: mapState('complaint', {
    loading: state => state.updateComplaint.loading
  }),
  methods: {
    ...mapActions('complaint', ['updateComplaint']),
    getImages(val) {
      if (val) {
        return val.split(',');
      }
      return [];
    },
    async handleSuccess() {
      await this.updateComplaint({
        id: this.complaint.id,
        type: 'success'
      });
      this.handleClose();
      this.$emit('resolved');
    },
    async handleRefuse() {
      await this.updateComplaint({
        id: this.complaint.id,
        type: 'failed'
      });
      this.handleClose();
      this.$emit('resolved');
    },
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.comp-image {
  width: 100px;
  height: 100px;
}
</style>

