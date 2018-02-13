var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var extractSass = new ExtractTextPlugin({
    filename: "main_bundle.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry : ['./app/index.js', './app/index.scss'],
    output : {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
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
         /* { // regular css files
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              loader: 'css-loader?importLoaders=1',
            }),
          },
         { // sass / scss loader for webpack
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          }*/
        ]
    },
    plugins: [
        /*new ExtractTextPlugin({ // define where to save the file
            filename: 'dist/main_bundle.css',
            allChunks: true,
        }),*/
        extractSass,
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};