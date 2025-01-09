// webpack이 assets/js에 빌드하면, server.js 에서 해당 폴더를 읽어야 한다.

const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@babel/preset-env"]],
          },
        },
      },
    ],
  },
};
