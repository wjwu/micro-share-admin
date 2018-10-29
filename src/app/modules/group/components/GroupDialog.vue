<template>
  <el-dialog title="群组详情" :visible="visible" width="50%" :before-close="handleClose">
    <el-tabs>
      <el-tab-pane label="基本信息">
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
            <el-col :span="12">
              <el-form-item label="提交来源：">
                <span style='color:red;font-weight:900;'>{{group.room && group.room.from| roomFromType}}</span>
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
      </el-tab-pane>
      <el-tab-pane label="统计信息">
        <el-card class="box-card" v-if="group && group.totalInfo">
          <div slot="header" class="clearfix">
            <span>该群5天收集信息如下：</span>
          </div>
          <div class="text item">
            1.&nbsp;&nbsp;群内成员共：<span class="red">{{group.totalInfo.members | number}}</span>名
          </div>
          <div class="text item">
            2.&nbsp;&nbsp;有<span class="red">{{group.totalInfo.senderNumbers | number}}</span>人发言了
          </div>
        </el-card>
        <el-card class="box-card" v-if="group && group.totalInfo">
          <div slot="header" class="clearfix">
            <span>该群涉嫌违规如下：</span>
          </div>
          <div class="text item">
            1.&nbsp;&nbsp;涉金圈关键词触发<span class="red">{{group.totalInfo.goldTimes | number}}</span>次
          </div>
          <div class="text item">
            2.&nbsp;&nbsp;涉赌圈关键词触发<span class="red">{{group.totalInfo.playTimes | number}}</span>次
          </div>
          <div class="text item">
            3.&nbsp;&nbsp;涉黄圈关键词触发<span class="red">{{group.totalInfo.yellowTimes | number}}</span>次
          </div>
          <div class="text item">
            4.&nbsp;&nbsp;传销圈关键词触发<span class="red">{{group.totalInfo.chuanxiaoTimes | number}}</span>次
          </div>
          <div class="text item">
            5.&nbsp;&nbsp;涉政圈关键词触发<span class="red">{{group.totalInfo.zhengzhiTimes | number}}</span>次
          </div>
          <div class="text item">
            6.&nbsp;&nbsp;涉诱导关键词触发<span class="red">{{group.totalInfo.youdaoTimes | number}}</span>次
          </div>
        </el-card>
        <el-card class="box-card" v-if="group && group.totalInfo">
          <div class="text item">
            群活跃度：<span class="red">{{group.totalInfo.activity}}</span>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="聊天记录">
        <div v-if="group && group.roomMsg">
          <p v-for="msg in group.roomMsg" :key="msg.id">
            <span>{{msg.senderName}}（{{msg.createTime | time}}）：</span>
            <span>{{msg.text}}</span>
          </p>
        </div>
      </el-tab-pane>
    </el-tabs>
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
  },
  filters: {
    number(val) {
      return Number(val);
    }
  }
};
</script>

<style scoped lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.box-card {
  margin: 20px;

  &:first-child {
    margin-top: 5px;
  }
}
.red {
  color: red;
  padding: 0 3px;
}
</style>

