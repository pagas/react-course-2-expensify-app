const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map', // better for style source-maps, before used eval-cheap-module-source-map
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
});
