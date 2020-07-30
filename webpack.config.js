const path = require("path");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin"); // подключили через дестриктуризацию
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production"; // переменные для определения режима разроботки прод или дев
const isDev = !isProd;

const filename = ext => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
  const loaders = [{
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  }];
  if (isDev) {
    loaders.push("eslint-loader");
  }
};

module.exports = {
  context: path.resolve(__dirname, "src"), // отвечает за то где лежат исходники
  mode: "development",
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: filename((ext = "js")),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"), // чтобы сократить //../../..//. - относительные все пути
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src/favicon.ico"),
        to: path.resolve(__dirname, "dist"),
      }],
    }),
    new MiniCssExtractPlugin({
      filename: filename((ext = "css")),
    }),
  ],
  module: {
    rules: [{
        test: /\.s[ac]ss$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          jsLoaders,
        },
      },
    ],
  },
};