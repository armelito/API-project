const path = require('path')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const dirApp = path.join(__dirname, '../src/client/app')
const dirStyles = path.join(__dirname, '../src/client/styles')
const dirStatic = path.join(__dirname, '../src/client/static')
const dirNode = 'node_modules'

module.exports =
{
  entry:
  [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.styl')
  ],
  resolve:
  {
    modules:
    [
      dirApp,
      dirStatic,
      dirStyles,
      dirNode
    ]
  },
  plugins:
  [
    new webpack.DefinePlugin({ IS_DEVELOPMENT }),
    new CopyWebpackPlugin
    ({
      patterns:
      [
        {
          from: path.resolve(__dirname, '../src/client/static'),
          to: ''
        }
      ]
    }),
    new MiniCssExtractPlugin
    ({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new ImageMinimizerPlugin
    ({
      minimizerOptions:
      {
        plugins:
        [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
        ],
      },
    })
  ],
  module:
  {
    rules:
    [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.styl$/,
        use:
        [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'stylus-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use:
        [
          {
            loader: 'file-loader',
            options:
            {
              name (file)
              {
                if (IS_DEVELOPMENT)
                  return '[path][name].[ext]'

                return '[hash].[ext]'
              },
              outputPath: 'assets/images/'
            }
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options:
            {
              severityError: 'warning',
              minimizerOptions: { plugins: ['gifsicle'] },
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        use:
        [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization:
  {
    minimize: true,
    minimizer: [ new TerserPlugin() ]
  }
}
