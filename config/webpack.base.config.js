const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const project = require('./project.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const devMode = process.env.NODE_ENV === 'development'
console.log('mode', devMode ? 'development' : 'production')
let config = {
  mode: devMode ? 'development' : 'production',
  stats: {
    chunks: true,
    chunkModules: true,
    colors: true,
    children: false
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
      },
      // {
      //   test: /\.(css|scss)$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           minimize: true,
      //           url: true
      //         }
      //       },
      //       {
      //         loader: 'sass-loader',
      //         options: {
      //           includePaths: [project.paths.client('styles')]
      //         }
      //       }
      //     ]
      //   })
      // },
      {
        test: /\.woff(\?.*)?$/,
        loader:
          'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader:
          'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        loader:
          'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader:
          'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader:
          'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.DefinePlugin(project.globals)
  ]
}

// if (!project.globals.__DEV__) {
//   const addConfig = {
//     plugins: [
//       new UglifyJsPlugin({
//         uglifyOptions: {
//           compress: true
//         }
//       })
//     ]
//   }
//   config = merge(config, addConfig)
// }

module.exports = config
