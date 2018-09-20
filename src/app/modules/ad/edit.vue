<template>
  <el-row v-loading="dataLoading">
    <el-col :span="16" :offset="4">
      <el-row>
        <el-form label-width="110px">
          <el-form-item label="广告类型：">
            <el-radio-group v-model="type">
              <el-radio label="VIDEO">视频</el-radio>
              <el-radio label="IMG">图片</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-form v-show="type === 'VIDEO'" label-width="110px" ref="videoForm" :model="videoForm" :rules="videoFormRules">
          <el-form-item label="名称：" prop="name">
            <el-input size="medium" v-model="videoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属广告位：" prop="positionCode">
            <el-select v-model="videoForm.positionCode" placeholder="请选择">
              <el-option v-for="item in positions" :key="item.position" :label="item.name" :value="item.position">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面图：" prop="cover">
            <single-upload :width="150" :height="150" v-model="videoForm.cover"></single-upload>
          </el-form-item>
          <el-form-item label="视频地址：" prop="videoUrl">
            <el-input size="medium" v-model="videoForm.videoUrl"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-form v-show="type === 'IMG'" label-width="110px" ref="imgForm" :model="imgForm" :rules="imgFormRules">
          <el-form-item label="名称：" prop="name">
            <el-input size="medium" v-model="imgForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属广告位：" prop="positionCode">
            <el-select v-model="imgForm.positionCode" placeholder="请选择">
              <el-option v-for="item in positions" :key="item.position" :label="item.name" :value="item.position">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片：" prop="picture">
            <single-upload :width="150" :height="150" v-model="imgForm.picture"></single-upload>
          </el-form-item>
          <el-form-item label="点击后：">
            <el-radio-group v-model="imgForm.jumpType" @change="handleChangeJumpType()">
              <el-radio label="URL">URL</el-radio>
              <el-radio label="H5_REL">H5页面Rel</el-radio>
              <el-radio label="ITEM_INFO">商品</el-radio>
              <el-radio label="SHOP">店铺</el-radio>
              <el-radio label="MEDIA">专栏</el-radio>
              <el-radio label="ARTICLE">文章</el-radio>
              <el-radio label="ALBUM">专辑</el-radio>
              <el-radio label="QA">问答</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="targetUrl">
            <el-input size="medium" v-model="imgForm.targetUrl" :disabled="disabledInput(imgForm.jumpType)"></el-input>
            <el-button type="text" size="medium" v-if="disabledInput(imgForm.jumpType)" @click="handleChoosePage(imgForm.jumpType)">{{imgForm.jumpType | jumpTypeText}}</el-button>
          </el-form-item>
          <el-form-item label="分享标题：" v-show="imgForm.jumpType === 'URL'">
            <el-input size="medium" v-model="imgForm.shareTitle"></el-input>
          </el-form-item>
          <el-form-item label="分享描述：" v-show="imgForm.jumpType === 'URL'">
            <el-input size="medium" v-model="imgForm.shareDesc"></el-input>
          </el-form-item>
          <el-form-item label="分享缩略图：" v-show="imgForm.jumpType === 'URL'">
            <single-upload :width="150" :height="150" v-model="imgForm.shareImg"></single-upload>
          </el-form-item>
        </el-form>
      </el-row>
      <div style="text-align:center;">
        <el-button type="primary" size="medium" @click="handleSave" :loading="loading">保存</el-button>
      </div>
      <page-config-dialog :visible.sync="pageConfigDialogVisible" :plate="plate" @afterChoose="handleAfterChoose"></page-config-dialog>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SingleUpload from '../../components/SingleUpload';
import MultipleUpload from '../../components/MultipleUpload';
import PageConfigDialog from './site/components/PageConfigDialog';

export default {
  components: {
    SingleUpload,
    MultipleUpload,
    PageConfigDialog
  },
  computed: mapState('ad', {
    positions: state => state.getPositions.data,
    loading: state => state.updateAd.loading,
    dataLoading: state => state.getAd.loading || state.getPositions.loading
  }),
  data() {
    const _this = this;
    const validatorFun = (jumpType, value, callback) => {
      if (jumpType === 'URL' && !value) {
        callback(new Error('请输入URL'));
      } else if (jumpType === 'ITEM_INFO' && !value) {
        callback(new Error('请选择商品'));
      } else if (jumpType === 'MEDIA' && !value) {
        callback(new Error('请选择专栏'));
      } else if (jumpType === 'ARTICLE' && !value) {
        callback(new Error('请选择文章'));
      } else if (jumpType === 'H5_REL' && !value) {
        callback(new Error('请输入H5页面Rel'));
      } else if (jumpType === 'SHOP' && !value) {
        callback(new Error('请选择店铺'));
      } else if (jumpType === 'ALBUM' && !value) {
        callback(new Error('请选择专辑'));
      } else if (jumpType === 'QA' && !value) {
        callback(new Error('请选择问答'));
      } else {
        callback();
      }
    };
    return {
      type: 'IMG',
      plate: 'ITEM_INFO',
      pageConfigDialogVisible: false,
      videoForm: {
        positionCode: '',
        name: '',
        cover: null,
        videoUrl: ''
      },
      videoFormRules: {
        positionCode: {
          required: true,
          message: '请所属广告位',
          trigger: 'change'
        },
        name: [{ required: true, message: '请输入名称', trigger: 'change' }],
        cover: [
          {
            required: true,
            message: '请上传视频首图',
            trigger: 'change'
          }
        ],
        videoUrl: [
          { required: true, message: '请输入视频地址', trigger: 'change' }
        ]
      },
      imgForm: {
        positionCode: '',
        name: '',
        picture: null,
        jumpType: 'URL',
        targetUrl: '',
        shareTitle: '',
        shareDesc: '',
        shareImg: null
      },
      imgFormRules: {
        positionCode: {
          required: true,
          message: '请所属广告位',
          trigger: 'change'
        },
        name: [{ required: true, message: '请输入名称', trigger: 'change' }],
        picture: [{ required: true, message: '请上传图片', trigger: 'change' }],
        targetUrl: [
          {
            validator: (rule, value, callback) => {
              validatorFun(_this.imgForm.jumpType, value, callback);
            },
            trigger: 'change'
          }
        ]
      }
    };
  },
  async created() {
    await this.getPositions({
      pageIndex: 1,
      pageSize: 9999
    });
    const ad = await this.getAd(this.$route.params.id);
    if (!ad) {
      return;
    }
    this.type = ad.type;
    const paramJson = JSON.parse(ad.paramJson);
    if (this.type === 'VIDEO') {
      this.videoForm = {
        positionCode: ad.adPositionCode,
        name: ad.name,
        cover: {
          md5: '',
          url: ad.src
        },
        videoUrl: paramJson.url
      };
    } else {
      this.imgForm = {
        positionCode: ad.adPositionCode,
        name: ad.name,
        picture: {
          md5: '',
          url: ad.src
        },
        jumpType: ad.jumpType,
        targetId: paramJson.id,
        targetUrl: paramJson.url || paramJson.title,
        shareTitle: paramJson.title,
        shareDesc: paramJson.description,
        shareImg: {
          md5: '',
          url: paramJson.image
        }
      };
    }
  },
  methods: {
    ...mapActions('ad', ['getPositions', 'updateAd', 'getAd']),
    disabledInput(jumpType) {
      return (
        jumpType === 'ITEM_INFO' ||
        jumpType === 'ARTICLE' ||
        jumpType === 'SHOP' ||
        jumpType === 'MEDIA' ||
        jumpType === 'ALBUM' ||
        jumpType === 'QA'
      );
    },
    handleChoosePage(plate) {
      this.plate = plate;
      this.pageConfigDialogVisible = true;
    },
    handleAfterChoose(page) {
      this.imgForm.targetUrl = page.title;
      this.imgForm.targetId = page.objectId;
    },
    handleChangeJumpType() {
      this.$refs.imgForm.validate();
      this.imgForm.targetUrl = '';
    },
    async handleSave() {
      let formName = `${this.type.toLowerCase()}Form`;
      await this.$refs[formName].validate();
      let request;
      if (this.type === 'VIDEO') {
        request = {
          id: this.$route.params.id,
          adPositionCode: this.videoForm.positionCode,
          name: this.videoForm.name,
          src: this.videoForm.cover.url,
          type: this.type,
          jumpType: 'NONE',
          paramJson: JSON.stringify({
            url: this.videoForm.videoUrl
          })
        };
      } else if (this.type === 'IMG') {
        const item = {
          id: this.$route.params.id,
          adPositionCode: this.imgForm.positionCode,
          name: this.imgForm.name,
          src: this.imgForm.picture.url,
          type: this.type,
          jumpType: this.imgForm.jumpType
        };
        if (item.jumpType === 'URL') {
          item.paramJson = JSON.stringify({
            url: this.imgForm.targetUrl,
            title: this.imgForm.shareTitle,
            description: this.imgForm.shareDesc,
            image: this.imgForm.shareImg ? this.imgForm.shareImg.url : ''
          });
        } else if (
          item.jumpType === 'ITEM_INFO' ||
          item.jumpType === 'SHOP' ||
          item.jumpType === 'MEDIA' ||
          item.jumpType === 'ARTICLE' ||
          item.jumpType === 'ALBUM' ||
          item.jumpType === 'QA'
        ) {
          item.paramJson = JSON.stringify({
            id: this.imgForm.targetId,
            title: this.imgForm.targetUrl
          });
        } else if (item.jumpType === 'H5_REL') {
          item.paramJson = JSON.stringify({
            rel: this.imgForm.targetUrl
          });
        } else {
          item.paramJson = JSON.stringify({});
        }
        request = item;
      }
      await this.updateAd(request);
    }
  },
  filters: {
    jumpTypeText: val => {
      if (val === 'ITEM_INFO') {
        return '选择商品';
      } else if (val === 'SHOP') {
        return '选择店铺';
      } else if (val === 'MEDIA') {
        return '选择专栏';
      } else if (val === 'ARTICLE') {
        return '选择文章';
      } else if (val === 'ALBUM') {
        return '选择专辑';
      } else if (val === 'QA') {
        return '选择问答';
      } else {
        return '';
      }
    }
  }
};
</script>

