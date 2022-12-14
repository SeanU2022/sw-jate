const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// USING WORKBOX 
const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

// USING MINICSS 
// uses MiniCssExtract so that index.js will NOT include CSS
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
        title: 'JATE Webpack Plugin',
      }),

      new MiniCssExtractPlugin(),

      // USING WORKBOX to generate generic dist/service-worker.js
      // note: src/js/index.js>Workbox MUST USE service.worker.js when using GenerateSW
      // new WorkboxPlugin.GenerateSW({
      //   swDest: 'service-worker.js'
      // }),

      // new WorkboxPlugin.GenerateSW({
      //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      //   runtimeCaching: [
      //     {
      //       urlPattern: [/\.(?:png|jpg|jpeg|svg)$/],
      //       handler: 'CacheFirst',
      //       options: {
      //         cacheName: 'images',
      //         expiration: {
      //           maxEntries: 5
      //         }
      //       }
      //     }
      //   ]
      // }),
      
      // INJECT MANIFEST
      // INJECT MANIFEST configured here like Workbox but now we can customise service-worker.js through src-sw.js
      // INJECT MANIFEST Workbox() must match src/js/index.js>Workbox:
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: serviceWorkerDistFile
      }), 

      // Creates dist/manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'An alternative to gist for when you are offline',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
          ],
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
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};
