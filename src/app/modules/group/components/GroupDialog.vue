<template>
  <el-dialog title="群组详情" :visible="visible" width="50%" :before-close="handleClose">
    <el-row>
      <el-form label-width="100px" v-if="group && group.group">
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
      </el-form>
    </el-row>
    <el-collapse v-if="group && group.roomMsg">
      <el-collapse-item title="群聊天纪录">
        <div v-for="msg in group.roomMsg" :key="msg.id">
          <span>{{msg.senderName}}（{{msg.createTime | time}}）：</span>
          <span>{{msg.text}}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="doAudit" size="medium" type="success" @click="handleClick('success')">审核通过</el-button>
      <el-button v-if="doAudit" size="medium" type="danger" @click="handleClick('fail')">审核失败</el-button>
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
      type: Function
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    handleClick(type) {
      this.doAudit(type);
    }
  }
};
</script>

