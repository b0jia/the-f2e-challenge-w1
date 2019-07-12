const keyname = name => `${process.env.VUE_APP_LS_PREFIX}_${name.toUpperCase()}`;

export default {
  get(name) {
    const key = keyname(name);
    return JSON.parse(window.localStorage.getItem(key));
    // return new Promise((resolve, reject) => {
    //   if (window.localStorage.getItem(key) === null) {
    //     reject(new Error(`Key '${key}' not found!`));
    //   }
    //   resolve(JSON.parse(window.localStorage.getItem(key)));
    // });
  },

  put(name, data) {
    return window.localStorage.setItem(keyname(name), JSON.stringify(data));
    // return true;
  },

  del(name) {
    // const data = this.get(name);
    // console.log(data);
    // // if (data === null) {
    // //   console.warn(`Key: ${keyname(name)} not found!`);
    // //   return null;
    // // }
    return window.localStorage.removeItem(keyname(name));
  },
};
