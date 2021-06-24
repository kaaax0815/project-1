const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  entry: 
  {
    peer: './dist/static/js/peer.js',
    local: './dist/static/js/local.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './static/js')
  }
};
