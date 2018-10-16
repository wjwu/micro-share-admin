<template>
  <el-dialog title="群组详情" :visible="visible" width="50%" :before-close="handleClose">
    <el-row>
      <el-form label-width="100px" v-if="group && group.group" ref="groupForm">
        <el-col :span="12">
          <el-form-item label="名称：">
            {{group.group.name}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信号：">
            {{group.group.wechatId}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行业：">
            {{group.group.industry}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人数：">
            {{group.group.count}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="位置：">
            {{group.group.location}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="匹配范围：">
            {{group.group.matchRange}}
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="描述：">
            {{group.group.desc}}
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="!doAudit">
          <el-form-item label="审核状态：">
            {{group.group.status | groupAuditStatus}}
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="!doAudit && group.group.status === 'REVIEW_FAILED'">
          <el-form-item label="不通过原因：">
            {{group.group.failedType | groupFailType}}
          </el-form-item>
        </el-col>
        <el-col v-if="doAudit">
          <el-form-item label="审核：">
            <el-radio-group v-model="result">
              <el-radio label="success">通过</el-radio>
              <el-radio label="fail">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="doAudit">
          <el-form-item label="不通过原因：" v-if="result === 'fail'">
            <el-radio-group v-model="reason">
              <el-radio label="ILLAGE">非法</el-radio>
              <el-radio label="DIE">僵尸群</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-collapse v-if="group && group.roomMsg">
      <el-collapse-item title="群聊天纪录（点击查看）">
        <div v-for="msg in group.roomMsg" :key="msg.id">
          <span>{{msg.senderName}}（{{msg.createTime | time}}）：</span>
          <span>{{msg.text}}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="doAudit" size="medium" type="primary" @click="handleClick" :loading="loading">保存</el-button>
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    group: {
      type: Object
    },
    visible: {
      type: Boolean,
      required: true
    },
    doAudit: {
      type: Boolean,
      default: false
    }
  },
  computed: mapState('group', {
    loading: state => state.updateGroup.loading
  }),
  data() {
    return { result: 'success', reason: 'ILLAGE' };
  },
  methods: {
    ...mapActions('group', ['updateGroup']),
    handleClose() {
      this.$emit('update:visible', false);
    },
    async handleClick() {
      await this.updateGroup({
        id: this.group.group.id,
        result: this.result,
        reason: this.reason
      });
      this.handleClose();
      this.$refs.groupForm.resetFields();
    }
  }
};
</script>

