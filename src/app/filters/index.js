import Vue from 'vue';

import './time';
import './order';
import './complaint';

Vue.filter('sex', val => {
  if (val === 'MAN') {
    return '男';
  }
  return '女';
});
