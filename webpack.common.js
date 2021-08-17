const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const {
    NODE_ENV
} = process.env

const devMode = NODE_ENV === 'development'
const prodMode = NODE_ENV === 'production'

module.exports = {
    mode: NODE_ENV,
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        cacheDirectory: true,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: (resourcePath) => resourcePath.endsWith(".module.css"),
                            }
                        },
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, devMode ? 'build-dev' : 'build-prod'),
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
        chunkFilename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Test react',
            template: 'public/index.html'
        }),
        ...(prodMode ? [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            })
        ] : [])
    ],
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
}
