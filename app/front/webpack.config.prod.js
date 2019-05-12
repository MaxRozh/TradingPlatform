// webpack v4
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ["./src/index.js"],
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: true,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
