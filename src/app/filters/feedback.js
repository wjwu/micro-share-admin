import Vue from 'vue';

Vue.filter('feedbackStatus', val => {
  if (val === 'SUBMIT') {
    return '已提交';
  } else if (val === 'REFUSE') {
    return '已拒绝';
  } else if (val === 'AGREE') {
    return '已采纳';
  } else {
    return '';
  }
});
