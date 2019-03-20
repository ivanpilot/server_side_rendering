// this webpack config allow us to run JSX and JS2015, 2016, 2017 code with nodeJS. Generally, node which run the express server with require statement figures on the fly what it needs. Here we are saying to nodeJS to wait as webpack will translate our code, build a bundle and then nodeJS could serve that bundle

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
// This above package allow us to decrease the bundle from the server side. For each import statement we have in our files, webpack will load the entire library and put it in the bundle output. It makes sense for the client but not for the server as the server does not need a bundle and keep the node_modules as it figures out the code at runtime.
// So here, for the server we want to make sure that any library already present in the node_module folder will not be part of the bundle on the server side.
// Remember that the reason we have a bundle on the server side is because we need to serve some html and react component (JSX) very quickly when the user comes to the page so the bundle is only because in order to achieve our goal we have a mix for ES2007 and 2015... with different module syntax and also because nodeJS needs to be able to manage JSX 

const config = {
    // inform we create a bundle for nodeJS instead that for a browser
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
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
    externals: [webpackNodeExternals()]
}

module.exports = merge(baseConfig, config);