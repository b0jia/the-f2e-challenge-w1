import _Vue from 'vue';

export default (Vue) => {
  Vue.prototype.$bus = new _Vue();
};
