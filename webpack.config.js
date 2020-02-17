const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
    fonts: 'fonts/'
};

module.exports = {
    entry: {
        app: "./src/index.js"
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist'
    },

    module: {
        rules: [
            {test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node-modules/
            },{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },{
            test: /\.scss$/i,
            use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },{
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ]
            },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/'
                }
            }
        ]
    },
    devServer: {
        overlay: true,
        contentBase: path.join(__dirname, '/public')
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Surf School',
            template:__dirname + '/public/index.html',
            filename: 'index_bundle.html'
        })
    ]
}