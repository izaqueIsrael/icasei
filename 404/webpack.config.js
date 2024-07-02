const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");
const packageJson = require("./package.json");

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
    ].filter(Boolean),
    devtool: "source-map",
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    externals: ["single-spa"],
  };
};
