const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dotenv = require('dotenv');
const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = {
    'process.env.PKG_VERSION': JSON.stringify(pkg.version)
  };
  for (const key in env) {
    envKeys[`process.env.${key}`] = JSON.stringify(env[key]);
  }
  for (const key in process.env) {
    if (key.indexOf('APP_') === 0) {
      envKeys[`process.env.${key.replace('APP_', '')}`] = JSON.stringify(process.env[key]);
    }
  }

  const plugins = [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.DefinePlugin(envKeys)
  ];

  if (isProduction) {
    plugins.push(new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }));
  }


  return {
    entry: "./src/index.tsx",
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.join(__dirname, "/dist"),
      publicPath: '/',
      filename: "[name].[hash].js"
    },
    devtool: isProduction ? false : "source-map",
    optimization: {
      minimizer: isProduction ? [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ] : [],
      splitChunks: {
        chunks: "all"
      }
    },
    resolve: {
      modules: ["src", "node_modules"],
      extensions: [".ts", ".tsx", ".js", '.mjs']
    },
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0'
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            },
            {
              loader: 'astroturf/loader',
              options: {enableCssProp: true},
            },
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              outputPath: 'images',
              limit: 1000,
            },
          },
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'astroturf/css-loader'],
        },
        {
          test: /\.scss$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'astroturf/css-loader', 'sass-loader'],
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    plugins,
    node: {
      fs: 'empty',
      vm: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  }
};
