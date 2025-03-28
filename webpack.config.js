const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  output: {
    uniqueName: "lasioTemplate",
    publicPath: "auto",
    library: { type: "var", name: "lasioTemplate" }, // ⬅️ Ensures CommonJS instead of ESM
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: false, // ✅ Ensure it's not forcing ESM output
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "lasioTemplate",
      filename: "remoteEntry.js",
      exposes: {
        "./ComponentModule": "./src/app/component.module.ts",
      },
      shared: {
        "@angular/core": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        },
      },
    }),
  ],
};
