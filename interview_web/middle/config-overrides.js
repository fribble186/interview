const {override, fixBabelImports, addPostcssPlugins, addWebpackAlias, addLessLoader, addWebpackModuleRule, addBabelPlugins, addBabelPresets, useBabelRc, addWebpackPlugin} = require('customize-cra');
const path = require('path');
var webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const overrideConfig = () => config => {

  if (config) {
    if (config.mode == 'production') {
      config.output.publicPath = '/interviewStatic/'
      config.output.chunkFilename = 'static/js/[name].chunk.js'
    }
  }
  return config;
}
module.exports = override(
  fixBabelImports('import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
    }
  ),
  overrideConfig(),
  addLessLoader({
    javascriptEnabled: true,
  }),
  addWebpackPlugin(
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
  ),
  addWebpackModuleRule(
    {
      test: /\.(sc|c)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader'],
    },
  ),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
