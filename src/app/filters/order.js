import Vue from 'vue';

Vue.filter('orderStatus', val => {
  if (val === 'MATCH_ONGOING') {
    return '匹配中';
  } else if (val === 'MATCH_SUCCESS') {
    return '匹配成功';
  } else if (val === 'MATCH_FAILED') {
    return '匹配失败';
  } else if (val === 'PAID') {
    return '已支付';
  } else if (val === 'DONE') {
    return '完成';
  } else if (val === 'COMMENT') {
    return '已评价';
  } else {
    return '';
  }
});
