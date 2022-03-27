const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [

            //HTML
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg|ktx)$/,
                type: 'asset/resource',
            },
            
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            },
             // Sounds
             {
                test: /\.mp3$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            },
            // Videos
            {
                test: /\.mp4$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            }
        ]
    }
}
