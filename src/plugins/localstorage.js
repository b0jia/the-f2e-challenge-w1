import localStorageHelper from '../helpers/localstorage';

export default (Vue) => {
  Vue.prototype.$ls = localStorageHelper;
};
