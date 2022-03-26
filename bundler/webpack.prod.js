const { merge } = require('webpack-merge')
const commonConfiguration = require('../bundler/webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin =  require('terser-webpack-plugin')


module.exports = merge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
            [
                new CleanWebpackPlugin(),
            ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]
        },
        module: {
            rules: [
                //CSS
                {
                    test: /\.css$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        'css-loader' //Turns css into common js
                    ]
                }
            ]
        }
    }
)