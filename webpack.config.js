const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

class FailingPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync("FailHere", function (compilation, callback) {
      function thisWillFail(resolve, reject) {
        console.log('rejecting promise');
        reject()
      }
      return new Promise((resolve, reject) => {
        thisWillFail(resolve, reject); // eslint-disable-line no-use-before-define
      });
    });
  }
};

module.exports = {
  bail: true,
  entry: {
    test: './build-test.scss',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-styles.min.css',
      chunkFilename: '[id].css',
    }),
    new FailingPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'css')
  },
  optimization: {
    emitOnErrors: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

