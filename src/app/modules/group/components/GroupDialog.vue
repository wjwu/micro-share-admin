<template>
  <el-dialog title="群组详情" :visible.sync="visible" width="50%" :before-close="handleClose">
    <el-form label-width="100px" v-if="group && group.group">
      <el-form-item label="名称：">
        {{group.group.name}}
      </el-form-item>
      <el-form-item label="微信号：">
        {{group.group.wechatId}}
      </el-form-item>
      <el-form-item label="人数：">
        {{group.group.count}}
      </el-form-item>
      <el-form-item label="位置：">
        {{group.group.location}}
      </el-form-item>
      <el-form-item label="描述：">
        {{group.group.description}}
      </el-form-item>
      <el-form-item label="匹配范围：">
        {{group.group.matchRange}}
      </el-form-item>
      <el-form-item label="创建时间：">
        {{group.group.createTime | time}}
      </el-form-item>
      <el-form-item label="更新时间：">
        {{group.group.updateTime | time}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
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
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

