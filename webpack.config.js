var prod = process.env.NODE_ENV === "production";

var webpack = require('webpack');
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var siteDir = path.join(__dirname, 'build', 'site');
var packageJson = require('./package.json');

var plugins = [
    new webpack.DefinePlugin({
        BUILD_VERSION: JSON.stringify(packageJson.version)
    }),
    new CopyWebpackPlugin([
        { from: 'res/index.html', to: path.join(siteDir, 'index.html') },
        { from: 'res/gfx', to: path.join(siteDir, 'gfx') }
    ])
];

module.exports = {
    devtool: 'source-map',
    entry: './build/out/src/index.js',
    target: 'web',
    output: {
        filename: 'app.js',
        path: siteDir
    },
    externals: {},
    plugins: plugins,
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./res'),
            path.resolve('./build/out/src')
        ]
    },
    module: {
        rules: [{
            test: /\.(jpg|png|svg|gif)$/,
            use: 'ignore-loader'
        }, {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'sass-loader'}
            ]
        }, {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]
        }, {
            test: /\.(hjson)$/,
            loader: 'hjson-loader'
        }, {
            test: /\.js$/,
            use: [ 'source-map-loader' ],
            enforce: 'pre',
            exclude: [
                path.resolve('./node_modules')
            ]
        }]
    },
    devServer: {
        contentBase: [
            './build/site',
            './node_modules/reveal.js',
            './node_modules/headjs/dist/1.0.0'
        ],
        port: 9000
    }
};
