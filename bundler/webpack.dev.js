const { merge } = require('webpack-merge')
const commonConfiguration = require('../bundler/webpack.common')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devtool: 'source-map',
        module: {
            rules: [
                //CSS
                {
                    test: /\.css$/,
                    use: [
                        'style-loader', //Injects styles into DOM
                        'css-loader' //Turns css into common js
                    ]
                }
            ]
        }

    }
)