// webpack.start1MiniCSSconfig.js
// adds CSS loaders and babel to webpack
// uses MiniCssExtract so that index.js will NOT include CSS

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// USING MINICSS 
// MiniCSS loader replaces default loader
// ADD TO client/package.json: "devDependencies": {..."mini-css-extract-plugin": "^2.4.5"} and run "npm install"
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      // USING MINICSS
      new MiniCssExtractPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          // USING MINICSS
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          // use: ['style-loader', 'css-loader'],
        },
        // FROM: https://webpack.js.org/guides/asset-management/#loading-images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
            presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
