const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const packageJson = require("./package.json");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Carregar variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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
        'process.env.BFF_URL': JSON.stringify(`${process.env.BFF_URL}:${process.env.BFF_PORT}`),
        'process.env.DRAWER_PORT': JSON.stringify(process.env.DRAWER_PORT),
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
      port: process.env.DRAWER_PORT ? Number(process.env.DRAWER_PORT) : 20229,
    },
    externals: ["single-spa"],
  };
};
