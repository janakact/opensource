const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = webpack.DefinePlugin
const CommonsChunkPlugin =  webpack.optimize.CommonsChunkPlugin

const pathTo = {
  app: path.join(__dirname, '../src/client/root.js'),
  public: path.join(__dirname, '../public'),
  index: path.join(__dirname, '../src/client/index.html')
}

module.exports = {
  entry: {
    app: pathTo.app
  },
  output: {
    path: pathTo.public,
    filename: '[name].js',
    publicPath: '/opensource'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1, modules: 1 } },
          { loader: 'sass-loader' }
        ]
      }
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: pathTo.index,
      inject: 'body',
      hash: true,
      filename: 'index.html'
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => /node_modules/.test(module.context),
    })
  ],
  devServer: {
    contentBase: pathTo.public,
    historyApiFallback: {
      index: '/opensource/index.html'
    }
  }
}
