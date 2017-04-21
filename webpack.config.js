var webpack = require("webpack");

module.exports = {
  entry: {
    app: ['whatwg-fetch', './lib/public/App.jsx'],
    // vendor: ["vendor-library"]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "underscore"
    }),
    new webpack.ProvidePlugin({
      moment: "moment"
    }),
  ],
  output: {
    path: './public',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};