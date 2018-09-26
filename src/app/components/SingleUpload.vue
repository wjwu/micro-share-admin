<template>
  <div class="single-upload">
    <div class="uploading" v-if="uploading" v-loading="uploading"></div>
    <div class="upload-error" v-if="error">
      <p>{{error}}</p>
      <p>
        <el-button type="text" size="medium" @click="handleCloseError">关闭</el-button>
      </p>
    </div>
    <img class="preview-img" v-if="imageObj && imageObj.url" :src="imageObj.url">
    <div class="empty" v-if="(!imageObj || !imageObj.url) && disabled">
      <span>暂无图片</span>
    </div>
    <el-upload v-if="!disabled" :action="uploadAction" :show-file-list="false" :on-success="handleSuccess" :on-error="handleError" :before-upload="handleBeforeUpload">
      <i class="el-icon-plus upload-icon" id="single" v-if="!imageObj || !imageObj.url"></i>
    </el-upload>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    maxSize: {
      type: Number,
      default: 5
    },
    imageObj: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 178
    },
    height: {
      type: Number,
      default: 178
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'imageObj'
  },
  data() {
    return {
      uploading: false,
      error: '',
      uploadAction: window.config.apiHost + '/resource'
    };
  },
  watch: {
    imageObj(curVal, oldVal) {
      this.$nextTick(this.setSize);
    },
    disabled(curVal, oldVal) {
      this.$nextTick(this.setSize);
    }
  },
  mounted() {
    this.$nextTick(this.setSize);
  },
  methods: {
    ...mapActions('global', ['notifyError']),
    setSize() {
      this.$el.style.width = `${this.width}px`;
      this.$el.style.height = `${this.height}px`;
      let icon = this.$el.querySelector('.upload-icon');
      if (icon) {
        icon.style.lineHeight = `${this.height}px`;
      }
    },
    handleSuccess(res) {
      this.uploading = false;
      this.$emit('input', res[0]);
      this.$emit('change', res[0]);
    },
    handleError() {
      this.uploading = false;
      this.error = '上传失败，请稍后重试';
    },
    handleCloseError() {
      this.error = '';
    },
    handleBeforeUpload(file) {
      this.uploading = true;
      const isLt5M = file.size / 1024 / 1024 <= this.maxSize;
      if (!isLt5M) {
        this.notifyError(`上传文件大小不能超过 ${this.maxSize}MB!`);
        this.uploading = false;
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss">
.single-upload {
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  div,
  .preview-img {
    height: 100%;
    width: 100%;
  }
  .el-upload,
  .preview-img,
  .uploading,
  .upload-error,
  .empty {
    border: 1px dashed #d9d9d9;
  }
  .el-upload {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    &:hover {
      border-color: #5062c1;
    }
    .upload-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 0;
  }
  .preview-img {
    position: absolute;
    z-index: 0;
  }
  .uploading,
  .upload-error {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    z-index: 2;
    p {
      line-height: initial;
      &:first-of-type {
        padding: 0 15px;
        text-align: center;
        word-break: keep-all;
      }
    }
  }
  .upload-error {
    color: #f56c6c;
    background-color: hsla(0, 0%, 100%, 0.9);
  }
}
</style>


