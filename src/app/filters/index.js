import Vue from 'vue';

import './time';
import './order';
import './complaint';
import './feedback';
import './group';
import './task';

Vue.filter('sex', val => {
  if (val === 'MAN') {
    return '男';
  }
  return '女';
});
