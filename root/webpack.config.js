/* eslint-disable prettier/prettier */
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "challenge";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new webpack.DefinePlugin({
        "process.env.ROOT_URL": JSON.stringify(process.env.ROOT_URL),
        "process.env.VIDEOS_URL": JSON.stringify(process.env.VIDEOS_URL),
        "process.env.DRAWER_URL": JSON.stringify(process.env.DRAWER_URL),
        "process.env.NOT_FOUND_URL": JSON.stringify(process.env.NOT_FOUND_URL),
        "process.env.ROOT_PORT": JSON.stringify(process.env.ROOT_PORT),
        "process.env.VIDEOS_PORT": JSON.stringify(process.env.VIDEOS_PORT),
        "process.env.DRAWER_PORT": JSON.stringify(process.env.DRAWER_PORT),
        "process.env.NOT_FOUND_PORT": JSON.stringify(
          process.env.NOT_FOUND_PORT
        ),
      }),
    ],
    devServer: {
      port: process.env.ROOT_PORT || 9000,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      historyApiFallback: true,
      compress: true,
    },
  });
};
