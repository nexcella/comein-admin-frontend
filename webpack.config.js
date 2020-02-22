const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv');
const pkg = require('./package.json');
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
      envKeys[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  }

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "/dist"),
      publicPath: '/'
    },
    devtool: "source-map",
    resolve: {
      modules: ["src", "node_modules"],
      extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
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
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    node: {
      fs: 'empty',
      vm: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  }
};
