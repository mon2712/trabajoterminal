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

module.exports = {
    entry : ['./app/index.js', './app/styles/index.scss'],
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath:'/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            //{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
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