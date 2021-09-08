const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3000,
        hot: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8080',
            }
        ],
    },
    optimization: {
        runtimeChunk: true
    },
    output: {
        pathinfo: false
    }
})
