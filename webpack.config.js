const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: './frontend/quiz.js',

    entry: {
        bundle: './frontend/bundle.js', // Entry for index.html
        'literati-carousel': './frontend/literati-carousel.scss', // Entry for literati-carousel.html
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'frontend/dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                quietDeps: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/index.html', // Path adjusted to frontend folder
            filename: 'index.html',
            chunks: ['bundle'], // Using 'bundle.js'
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/literati-carousel.html', // Path adjusted to frontend folder
            filename: 'literati-carousel.html',
            chunks: ['literati-carousel'],
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/about.html', // Path to the source HTML file
            filename: 'about.html', // Name of the output file (can be the same as the input)
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/budding-bookworm.html',
            filename: 'budding-bookworm.html',
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/cool-connoisseur.html',
            filename: 'cool-connoisseur.html',
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/evolving-egghead.html',
            filename: 'evolving-egghead.html',
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/looney-literati.html',
            filename: 'looney-literati.html',
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/perpetual-peruser.html',
            filename: 'perpetual-peruser.html',
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: 'public' }],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'frontend/dist'),
        },
        historyApiFallback: true,
        port: 8080,
        // publicPath: '/',
        // watchContentBase: true,
        open: true,
    },
};
