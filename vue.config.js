module.exports = {
  outputDir: process.env.NODE_ENV === 'production' ? 'demo' : 'dist',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/the-f2e-challenge-w1/demo/'
    : '/',
};
