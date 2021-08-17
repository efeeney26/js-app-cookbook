const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const {
    NODE_ENV
} = process.env

const isDevMode = NODE_ENV === 'development'
const isProdMode = NODE_ENV === 'production'

module.exports = {
    mode: NODE_ENV,
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.([jt])s(x)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        cacheDirectory: true,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
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
                    isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
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
        path: path.resolve(__dirname, isDevMode ? 'build-dev' : 'build-prod'),
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
        new webpack.EnvironmentPlugin({
            NODE_ENV
        }),
        ...(isProdMode ? [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            })
        ] : [])
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
}
