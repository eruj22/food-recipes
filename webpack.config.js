const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  let config = {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.dist.js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-modules-typescript-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/assets/icon-food.png",
      }),
      new Dotenv(),
    ],
  };

  if (argv.mode === "development") {
    config = {
      ...config,
      devtool: "inline-source-map",
      devServer: {
        historyApiFallback: true,
        static: "./dist",
        hot: true,
      },
    };
  }

  return config;
};
