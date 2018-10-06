import Vue from 'vue';

Vue.filter('compType', val => {
  if (val === 'RESOURCE_ILLEGAL') {
    return '对方源群涉嫌非法';
  } else if (val === 'ACT_ILLEGAL') {
    return '对方行为涉嫌非法';
  } else {
    return '';
  }
});

Vue.filter('compStatus', val => {
  if (val === 'REPORTED') {
    return '投诉';
  } else if (val === 'REPORTED_DISAVOW') {
    return '投诉不承认';
  } else if (val === 'SUCCESS') {
    return '投诉处理成功';
  } else if (val === 'CUSTOMER_AGREE') {
    return '客服处理同意';
  } else if (val === 'CUSTOMER_REFUSE') {
    return '客服处理拒绝';
  } else {
    return '';
  }
});
