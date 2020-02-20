const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  devtool: "none",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
              configFile: "tsconfig.json",
              compilerOptions: {
                outDir: "./dist"
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  target: "web",
  output: {
    filename: "bundle.js",
    library: "formik-yup",
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, "dist")
  }
};
