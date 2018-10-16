import Vue from 'vue';

Vue.filter('groupAuditStatus', val => {
  if (val === 'REVIEW_ONGOING') {
    return '待审核';
  } else if (val === 'REVIEW_SUCCESS') {
    return '审核通过';
  } else if (val === 'REVIEW_FAILED') {
    return '审核失败';
  } else {
    return '';
  }
});

Vue.filter('groupFailType', val => {
  if (val === 'ILLAGE') {
    return '非法';
  } else if (val === 'DIE') {
    return '僵尸群';
  } else {
    return '';
  }
});
