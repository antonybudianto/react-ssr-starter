const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const project = require('./project.config')
const { assetUrl } = require('./env.config').default
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV === 'development'

const config = {
  devtool: project.globals.__PROD__ ? false : 'source-map',
  entry: {
    app: [
      ...(project.globals.__DEV__
        ? ['webpack-hot-middleware/client?timeout=1000&reload=true']
        : []),
      project.paths.client('renderer/client')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          extends: path.resolve(__dirname, '../.client.babelrc')
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              url: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [project.paths.client('styles')]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: project.globals.__DEV__ ? '[name].js' : `[name].[hash].js`,
    publicPath: assetUrl,
    path: project.paths.dist()
  },
  plugins: [
    ...(project.globals.__DEV__
      ? [new webpack.HotModuleReplacementPlugin()]
      : []),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
}

module.exports = merge(config, baseConfig)
