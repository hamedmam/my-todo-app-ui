require('regenerator-runtime/runtime');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],

    plugins: ['react-native-reanimated/plugin'],
  };
};
