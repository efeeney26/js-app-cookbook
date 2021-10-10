const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "node_vendors",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                }
            }
        }
    }
})
