const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
//const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    resolve: {
        //extensions: [],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@':  path.resolve(__dirname, 'src'),
        }
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        watchFiles:{
            paths: ['src/**/*.*'],
        },
        liveReload: true,
        open: true,
        port: 8080,
    },
    optimization: {
        splitChunks: {
                chunks: 'all'
            },
        minimizer: [
            new OptimizeCssPlugin(),
            new TerserWebpackPlugin(),
        ]
        //runtimeChunk: 'single'
    },
    devtool: 'source-map',
    plugins: [
        new HTMLWebpackPlugin({
          template: './index.pug',
            //minify: 'false',
            inject: 'body',
        }
      ),
        //new ESLintPlugin(),
        new CleanWebpackPlugin(),
        //new CopyWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: '[name].[contenthash].css',
            }
        ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                },
                    'css-loader',
                    'sass-loader'
                ]
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
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.pug$/i,
                use: ['pug-loader'],
                exclude: /(node_modules | bower_components)/,
            },
        ]
    }
}