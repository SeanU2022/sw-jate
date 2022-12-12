// webpack.start1MiniCSSconfig.js
// adds CSS loaders and babel to webpack
// uses MiniCssExtract so that index.js will NOT include CSS

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// USING WORKBOX 
const WorkboxPlugin = require('workbox-webpack-plugin');
// INJECT MANIFEST
const { InjectManifest } = require('workbox-webpack-plugin');

// USING MINICSS 
// MiniCSS loader replaces default loader
// ADD TO client/package.json: "devDependencies": {..."mini-css-extract-plugin": "^2.4.5"} and run "npm install"
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Add and configure workbox plugins for a service worker and manifest file
// this is also declared in src/js/index.js
const serviceWorkerDistFile = "service-worker.js"

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

      // USING WORKBOX to generate generic dist/service-worker.js
      // note: src/js/index.js>Workbox MUST USE service.worker.js when using GenerateSW
      // new WorkboxPlugin.GenerateSW(),
      
      // INJECT MANIFEST
      // INJECT MANIFEST configured here like Workbox but now we can customise service-worker.js through src-sw.js
      // INJECT MANIFEST Workbox() must match src/js/index.js>Workbox:
      new InjectManifest({
        swSrc: './src-sw.js',
        // swDest: 'service-worker.js',
        swDest: serviceWorkerDistFile,
      }), 
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
