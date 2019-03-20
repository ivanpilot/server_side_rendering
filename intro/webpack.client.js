const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
    // tell webpack to run babel on everyfile it run through
    //module: {
    //    rules: [
    //        {
    //            test: /\.js?$/,
    //            loader: 'babel-loader',
    //            exclude: /node_modules/,
    //            options: {
    //                presets: [
    //                    'react',
    //                    'stage-0',
    //                    ['env', {
    //                        targets: {
    //                            browsers: ['last 2 versions']
    //                        }
    //                    }]
    //                ]
    //            }
    //        }
    //    ]
    //}
}

module.exports = merge(baseConfig, config);