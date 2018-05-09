const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const project = require('./project.config')
const { assetUrl } = require('./env.config').default
const path = require('path')
const StartServerPlugin = require('start-server-webpack-plugin')

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
      },
      {
        test: /\.s?[ac]ss$/,
        use: 'null-loader'
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
      new StartServerPlugin({
        entryName: 'bundle'
      })
    ]
  }
  config = merge(config, addConfig)
}

module.exports = merge(config, baseConfig)
