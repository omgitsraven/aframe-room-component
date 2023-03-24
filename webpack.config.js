'use strict';

const Path = require('path');

module.exports = [
    {
        entry: './index.js',
        output: {
            filename: 'aframe-room-component.js',
            library: { type: 'umd' },
            path: Path.resolve(__dirname, 'dist'),
            publicPath: '/dist/'
        },
        mode: 'development',
        devtool: 'eval-source-map',
        stats: { colors: true },
        devServer: {
            port: process.env.PORT || 8000,
            hot: false,
            liveReload: true,
            static: {
                directory: Path.resolve(__dirname)
            }
        }
    }
];
