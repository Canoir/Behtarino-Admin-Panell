const path = require('path');
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@organs': path.resolve(__dirname, 'src/components/organisms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@typings': path.resolve(__dirname, 'src/typings'),
      '@helpers': path.resolve(__dirname, 'src/helpers')
    }
  };
  return config;
};
