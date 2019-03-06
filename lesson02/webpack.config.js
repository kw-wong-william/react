const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        myname: './src/index.js',
        common: [
            './src/common/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'resource/js/[name]/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader' }, { loader: 'less-loader' }]
                })
            },
            {
                test: /\.(pdf|jpg|png|gif)$/,
                use: {
                    loader: 'url-loader'
                }
            },
            {
                test: /\.(ico)$/,
                loader: 'file-loader',
                options: { name: 'resource/image/[name].[ext]' }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'resource/font/[name].[ext]',
                    publicPath: '../../../',
                }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            title: '',
            favicon: '',
            chunks: ['myname', 'common']
        }),
        new ExtractTextPlugin({
            filename: 'resource/css/[name]/index.css'
        }),
    ]
};
