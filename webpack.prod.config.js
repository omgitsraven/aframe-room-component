'use strict';

const Path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
    {
        entry: './index.js',
        output: {
            filename: 'aframe-room-component.min.js',
            library: { type: 'umd' },
            path: Path.resolve(__dirname, 'dist')
        },
        mode: 'production',
        devtool: 'source-map',
        stats: { colors: true },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: { passes: 2 },
                        format: { comments: false }
                    },
                    extractComments: false
                })
            ]
        }
    }
];
