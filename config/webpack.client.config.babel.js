const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const project = require('./project.config')
const { assetUrl } = require('./env.config').default
const path = require('path')

const config = {
  devtool: project.globals.__PROD__ ? false : 'source-map',
  entry: {
    app: project.paths.client('renderer/client')
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
      }
    ]
  },
  output: {
    filename: project.globals.__DEV__
      ? '[name].js'
      : `[name].[${project.compiler_hash_type}].js`,
    publicPath: assetUrl,
    path: project.paths.dist()
  },
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
