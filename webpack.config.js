const path = require('path');
const webpack = require("webpack");

const PROD = JSON.parse(process.env.PROD_DEV || "0");

const PATHS = {
  app: path.join(__dirname, 'app/public/js/main.js'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  // Entry accepts a path or an object of entries.
  // The build chapter contains an example of the latter.
  entry: PATHS.app,
  devtool: "source-map",
  output: {
    path: PATHS.build,
    filename: PROD ? "bundle.min.js" : "bundle.js"
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ] : [],
  module:{
    preLoaders: [
      { test: /\.json$/, loader: "json-loader" }
    ],
    loaders: [
      { test: __dirname,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve : {
  	root: [
      __dirname
  	],
  	modulesDirectories: [
      'node_modules'
  	],
  	alias : {
  	  asset : 'app/public/asset/'
  	}
  }
};
