<template>
  <div class="multiple-upload">
    <div class="item" v-for="(image,i) in imageList" :key="i">
      <single-upload :width="width" :height="height" @change="handleChange(...arguments,i)" v-model="imageList[i]"></single-upload>
      <div class="remove" v-if="image.url">
        <el-button type="text" size="medium" @click="handleRemove(i)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SingleUpload from './SingleUpload';
const emptyImage = {
  md5: '',
  url: ''
};
export default {
  components: {
    SingleUpload
  },
  props: {
    width: {
      type: Number,
      default: 178
    },
    height: {
      type: Number,
      default: 178
    },
    max: {
      type: Number
    },
    images: {
      type: Array,
      default: () => {
        return [emptyImage];
      }
    }
  },
  model: {
    prop: 'images'
  },
  watch: {
    // images(curVal) {
    //   debugger;
    // }
    // images(curVal) {
    //   if (curVal && curVal.length > 0) {
    // if (
    //   this.max === undefined ||
    //   (this.max > 0 && curVal.length < this.max)
    // ) {
    //   this.images.push(emptyImage);
    // }
    //   }
    // }
  },
  data() {
    return {
      imageList: []
    };
  },
  created() {
    if (this.images.length === 0) {
      this.imageList.push(emptyImage);
    } else {
      this.imageList = [...this.images];
      if (this.images.length < this.max) {
        this.imageList.push(emptyImage);
      }
    }
  },
  methods: {
    handleRemove(i) {
      this.imageList.splice(i, 1);
      const lastImage = this.imageList[this.imageList.length - 1];
      if (this.imageList.length < this.max && lastImage.url) {
        this.imageList.push(emptyImage);
      }
      let tmp = [...this.imageList];
      this.$emit('input', tmp);
      this.$emit('change', tmp);
    },
    handleChange(image, i) {
      if (
        this.max === undefined ||
        (this.max > 0 &&
          this.imageList.length < this.max &&
          i + 1 === this.imageList.length)
      ) {
        this.imageList.push(emptyImage);
      }
      let tmp = [...this.imageList];
      this.$emit('input', tmp);
      this.$emit('change', tmp);
    }
  }
};
</script>

<style lang="scss">
.multiple-upload {
  .item {
    display: inline-flex !important;
    flex-direction: column;
    margin-right: 15px;
  }
  .single-upload {
    display: inline-block !important;
  }
  .remove {
    text-align: center;
  }
}
</style>


