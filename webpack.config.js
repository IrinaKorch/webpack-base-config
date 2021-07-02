const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")


const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './index.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.sass'],
        alias: {
            // короткие пути
            '@public': path.resolve(__dirname, 'src/public')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
    devtool: isDev? 'source-map' : false,
    devServer: {
        port: 8080,
        hot: true,
        // contentBase: './dist',
    },
    module: {
        // rules: [{ test: /\.txt$/, use: 'raw-loader' }],
        rules: [
            {
                test: /\.css$/i,
                use: [
                    { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader},
                    { loader: 'css-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader},
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Development',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public'),
                    to: path.resolve(__dirname, 'dist/public')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: "[id].css",
        }),
    ],

}
