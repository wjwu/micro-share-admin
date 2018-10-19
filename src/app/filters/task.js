import Vue from 'vue';

Vue.filter('taskType', val => {
  if (val === 'TEXT') {
    return '文本';
  } else if (val === 'IMG') {
    return '图片';
  } else if (val === 'CARD') {
    return '分享卡片';
  }
  return '';
});
