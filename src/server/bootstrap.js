require("ignore-styles");

require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "transform-assets",
      {
        extensions: ["css", "svg"],
        name: "static/css/[name].[hash:8].chunk.[ext]",
      },
    ],
  ],
});

require("./index");
