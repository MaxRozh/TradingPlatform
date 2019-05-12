// webpack v4
const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ["./src/index.js"],
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist/build/',
    publicPath: "build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        exclude: [/node_modules/, /dist/]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: [/node_modules/, /dist/]
      },
      {
        test: /\.gif$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=image/gif'
          }
        ]
      },
      {
        test: /\.jpg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=image/jpg'
          }
        ]
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=image/png'
          }
        ]
      },
      {
        test: /\.svg/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=26000&mimetype=image/svg+xml'
          }
        ]
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader?presets[]=react'
          }
        ]
      },
      {
        enforce: "pre",
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader'
          }
        ],
        options: {
            fix: false
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'log': __dirname + '' + '/plugins/logger.js'
    }),
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new FaviconsWebpackPlugin({
    //   logo: './//',
    //   inject: true,
    //   background: '#222428',
    //   title: '...',
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: false,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: true
    //   }
    // })
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    proxy: {
      '/api/**': {
        target: 'http://localhost:8999/',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
      }
    }
  }
};
