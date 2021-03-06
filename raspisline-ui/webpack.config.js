
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ProvidePlugin} = require("webpack");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel-loader",
                options:
                    {
                        presets: [
                            '@babel/react',
                            {
                                plugins: [
                                    '@babel/plugin-proposal-class-properties'
                                ]
                            }
                        ]

                    }

            },
            {
                test: /\.(css|sccs)$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /.(ttf|woff|woff2|eot)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        // new ProvidePlugin({
        //     _: 'lodash',
        // }),

    ],
    devServer: {
        proxy: {
            '/api': 'http://localhost:9080'
        },
        historyApiFallback: true,
    },
    devtool: 'source-map'
};