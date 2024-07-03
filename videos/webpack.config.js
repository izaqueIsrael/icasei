const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const packageJson = require("./package.json");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Carregar variáveis de ambiente do arquivo .env
dotenv.config({ path: '../.env' });

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.ts",
    output: {
      filename: "index.js",
      libraryTarget: "system",
      path: path.resolve(process.cwd(), "dist"),
      uniqueName: packageJson.name,
      publicPath: "",
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          parser: {
            system: false,
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-typescript",
                ],
              },
            },
            "ts-loader",
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.html$/i,
          use: ["html-loader"],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: false,
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      !isProduction && new HtmlWebpackPlugin({
        template: './src/template.html',
      }),
      new StandaloneSingleSpaPlugin({
        appOrParcelName: packageJson.name,
        disabled: isProduction,
      }),
      new webpack.DefinePlugin({
        'process.env.BFF_URL': JSON.stringify(process.env.BFF_URL),
        'process.env.BFF_PORT': JSON.stringify(process.env.BFF_PORT),
        'process.env.VIDEOS_PORT': JSON.stringify(process.env.VIDEOS_PORT),
      }),
    ].filter(Boolean),
    devtool: "source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      },
      port: process.env.VIDEOS_PORT ? Number(process.env.VIDEOS_PORT) : 20228,
    },
    externals: ["single-spa"],
  };
};
