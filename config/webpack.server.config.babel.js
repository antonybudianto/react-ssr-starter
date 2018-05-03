const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const project = require('./project.config')
const { assetUrl } = require('./env.config').default
const NodemonPlugin = require('nodemon-webpack-plugin')
const path = require('path')

let config = {
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          extends: path.resolve(__dirname, '../.server.babelrc')
        }
      }
    ]
  },
  entry: {
    bundle: project.paths.client('renderer/server')
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    publicPath: assetUrl,
    path: project.paths.dist()
  }
}

if (project.globals.__DEV__) {
  const addConfig = {
    plugins: [
      new NodemonPlugin({
        ignore: ['*.js.map', '*.svg', '*.png', '*.css', '*.css.map'],
        watch: project.paths.dist(),
        script: project.paths.dist('bundle')
      })
    ]
  }
  config = merge(config, addConfig)
}

module.exports = merge(config, baseConfig)
