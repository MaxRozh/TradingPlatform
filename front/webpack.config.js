var webpack = require('webpack');
var BROWSER = env.BROWSER;

module.exports = {
    entry: ["./src/main.js"],
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loaders: "style-loader!css-loader!postcss-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.scss$/,
                loaders: "style-loader!css-loader!postcss-loader!sass-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react'],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.wav$/,
                loader: 'file-loader'
            },
            {
                enforce: "pre",
                test: [/\.js$/, /\.jsx$/],
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    fix: false
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'log': __dirname + '' + '/plugins/logger.js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev'),
                'BROWSER': JSON.stringify(BROWSER),
                'APP_TYPE': JSON.stringify('visitor'),
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};
