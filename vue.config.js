// const url = require('url');
const packageInfos = require('./package.json');

const publicPath = process.env.NODE_ENV === 'production'
  ? '/the-f2e-challenge-w1/demo/'
  : '/';

module.exports = {
  outputDir: process.env.NODE_ENV === 'production' ? 'demo' : 'dist',
  publicPath,

  chainWebpack(config) {
    // console.log(config);
    config
      .plugin('html')
      .tap((args) => {
        if (process.env.NODE_MODE !== 'development') {
          args[0].minify = false;
          args[0].meta = {
            description: process.env.VUE_APP_SITE_DESC,
            keywords: process.env.VUE_APP_SITE_KEYWORDS,

            'og:url': {
              property: 'og:url',
              content: process.env.VUE_APP_SITE_HOST,
            },
            'og:type': {
              property: 'og:type',
              content: 'website',
            },
            'og:title': {
              property: 'og:title',
              content: process.env.VUE_APP_SITE_TITLE,
            },
            'og:image': {
              property: 'og:image',
              content: `${process.env.VUE_APP_SITE_HOST}/img/og-image.jpg?v=${new Date().getTime()}`,
              // content: url.resolve(process.env.VUE_APP_SITE_HOST,
              // `/img/og-image.jpg?v=${new Date().getTime()}`),
            },
            'og:image:alt': {
              property: 'og:image:alt',
              content: process.env.VUE_APP_SITE_DESC,
            },
            'og:image:width': {
              property: 'og:image:width',
              content: 1200,
            },
            'og:image:height': {
              property: 'og:image:height',
              content: 630,
            },
            'og:description': {
              property: 'og:description',
              content: process.env.VUE_APP_SITE_DESC,
            },
            'og:site_name': {
              property: 'og:site_name',
              content: process.env.VUE_APP_SITE_TITLE,
            },
            'og:locale': {
              property: 'og:locale',
              content: 'zh_TW',
            },
          };
        }
        return args;
      });

    config
      .plugin('define')
      .tap((args) => {
        args[0]['process.env'].VUE_APP_BUILD_VERSION = packageInfos.version;
        args[0]['process.env'].VUE_APP_BUILD_TIMESTAMP = `"${new Date().getTime()}"`;
        return args;
      });
  },
};
