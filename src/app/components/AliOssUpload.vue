<template>
  <div class="ali-oss-upload">
    <el-button v-if="!uploading" type="primary" size="medium" @click="handleOpen">浏 览</el-button>
    <div class="progressbar" v-if="uploading">
      <el-progress :text-inside="true" :stroke-width="16" :percentage="percentage" :status="status"></el-progress>
      <p class="error" v-if="error" @click="handleError">{{error}}</p>
    </div>
    <input type="file" @change="handleUpload($event)" :accept="accept" />
    <el-button v-if="!uploading" type="primary" size="medium" @click="uploadMedia">上传</el-button>
  </div>
</template>

<script>
import OSS from 'ali-oss';
import { mapActions } from 'vuex';
export default {
  props: {
    maxSize: {
      type: Number,
      default: 10
    },
    // 文件类型 https://www.cnblogs.com/jiangxiaochang/p/6703730.html
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      percentage: 0,
      status: '',
      uploading: false,
      error: '',
      file: null,
      fileStatus: false
    };
  },
  methods: {
    ...mapActions('global', ['notifyError', 'notifySuccess']),
    handleError() {
      this.uploading = false;
    },
    handleOpen() {
      this.$el.querySelector('input').click();
    },
    handleUpload(e) {
      let file = e.target.files[0];
      const format = file ? file.name.split('.')[1] : '';
      const type = file ? file.type.split('/')[0] : '';
      // /avi|wmv|mpeg|mp4|mov|mkv|flv|f4v|m4v|rmvb|rm|3gp/
      if (/mp4/i.test(format) && type === 'video') {
        this.fileStatus = true;
      } else if (/mp3/i.test(format) && type === 'audio') {
        this.fileStatus = true;
      } else {
        this.fileStatus = false;
      }
      if (this.fileStatus) {
        file.name.substring(file.name.lastIndexOf('.') + 1);
        if (file.size > Number(this.maxSize) * 1024 * 1024) {
          alert(`文件大小不能超过${this.maxSize}MB!`);
          return;
        }
        this.file = file;
      } else {
        this.notifyError(`暂不支持此${format}格式！`);
      }
      this.$emit('localAddress', this.fileStatus ? file.name : '');
    },
    async uploadMedia() {
      const client = new OSS({
        region: window.config.ossRegion,
        accessKeyId: 'LTAIr6veqBQSosiR',
        accessKeySecret: 'eemyb7rZkXL0hDIRaB7rhrm4ovIv53',
        bucket: window.config.ossBucket
      });

      try {
        if (this.fileStatus) {
          this.error = '';
          const name = this.file.name.split('.');
          const newName = `${name[0]}_${new Date().getTime()}.${name[1]}`;
          this.uploading = true;
          const result = await client.multipartUpload(newName, this.file, {
            progress: p => {
              this.percentage = Math.ceil(p.toFixed(2) * 100);
              if (this.percentage >= 100) {
                this.status = 'success';
                setTimeout(() => {
                  this.uploading = false;
                  this.percentage = 0;
                  this.status = '';
                }, 1500);
              }
            }
          });
          this.$emit('complete', result.res.requestUrls[0].split('?')[0]);
          this.notifySuccess('上传成功');
        } else {
          this.notifyError('请选取文件！');
        }
      } catch (e) {
        this.error = '上传失败';
        throw e;
      }
    }
  }
};
</script>

<style lang="scss">
.ali-oss-upload {
  display: flex;
  align-items: center;

  .progressbar {
    width: 200px;
  }
  input[type='file'] {
    display: none;
  }
  .el-button {
    margin-right: 10px;
  }
  .error {
    line-height: normal;
    text-align: center;
    color: #f56c6c;
  }
}
</style>


