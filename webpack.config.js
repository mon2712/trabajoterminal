var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractSass = new ExtractTextPlugin({
    filename: "main_bundle.css",
    disable: process.env.NODE_ENV === "development"
});

const components = [
    './app/libs/jquery.js',
    './app/libs/angular.js'
];

const scripts = [
    './app/index.js',
    './app/styles/index.scss'
];

module.exports = {
    entry : scripts,
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath:'/'
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            //{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader', options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                    } 
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer:{
        historyApiFallback: true
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};