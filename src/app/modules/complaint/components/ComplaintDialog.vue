<template>
  <el-dialog title="投诉详情" :visible="visible" width="60%" :before-close="handleClose">
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
    <el-form label-width="100px" ref="complaintForm" :model="complaintForm" :rules="complaintFormRules">
      <el-form-item label="处理理由：" prop="content">
        <el-input type="textarea" rows="5" placeholder="请输入理由" v-model="complaintForm.content">
        </el-input>
      </el-form-item>
    </el-form>
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
  data() {
    return {
      complaintForm: {
        content: ''
      },
      complaintFormRules: {
        content: [
          { required: true, message: '请输入处理理由', trigger: 'change' }
        ]
      }
    };
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
      this.$refs.complaintForm.validate(async valid => {
        if (valid) {
          await this.updateComplaint({
            id: this.complaint.id,
            type: 'success',
            content: this.complaintForm.content
          });
          this.handleClose();
          this.$emit('resolved');
        }
      });
    },
    async handleRefuse() {
      this.$refs.complaintForm.validate(async valid => {
        if (valid) {
          await this.updateComplaint({
            id: this.complaint.id,
            type: 'failed',
            content: this.complaintForm.content
          });
          this.handleClose();
          this.$emit('resolved');
        }
      });
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

