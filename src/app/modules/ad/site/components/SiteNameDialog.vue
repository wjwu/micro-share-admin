<template>
  <d-dialog :tabs="[AD_SITE_LIST]" title="修改广告位名称" :visible="visible" width="400px" :before-close="handleClose" @open="handleOpen">
    <el-form :rules="siteRules" :model="siteForm" ref="siteForm">
      <el-form-item prop="name">
        <el-input size="medium" v-model="siteForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="default" @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </d-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DDialog from '../../../../components/Dialog';
import { AD_SITE_LIST } from '../../../../../common/js/menus';

export default {
  props: {
    visible: {
      type: Boolean
    },
    site: {
      type: Object,
      required: true
    }
  },
  components: {
    DDialog
  },
  computed: mapState('ad', {
    loading: state => state.updatePosition.loading
  }),
  data() {
    return {
      AD_SITE_LIST,
      siteForm: {
        name: ''
      },
      siteRules: {
        name: [
          { required: true, message: '请输入广告位名称', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    ...mapActions('ad', ['updatePosition']),
    handleOpen() {
      this.siteForm.name = this.site.name;
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
    async handleSave() {
      await this.$refs.siteForm.validate();
      await this.updatePosition({
        id: this.site.id,
        name: this.siteForm.name
      });
      this.$emit('updated');
      this.handleClose();
    }
  }
};
</script>

