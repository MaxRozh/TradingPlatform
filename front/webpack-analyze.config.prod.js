var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {

    var BROWSER = env.BROWSER;
    var filename = BROWSER == "visitor_moz_ie" ? "moz-ie-bundle.js" : "bundle.js";

    return {
        entry: "./src/main.js",
        output: {
            path: __dirname + '/public/build/',
            publicPath: "/js/",
            filename: filename
        },
        resolveLoader: {
            moduleExtensions: ["-loader"]
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: "babel",
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
                    test: /\.json$/,
                    loader: "json-loader"
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    'BROWSER': JSON.stringify(BROWSER),
                    'APP_TYPE': JSON.stringify('visitor')
                }
            }),

            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                children: true,
                async: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                mangle: true,
                compress: {
                    sequences: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    warnings: false,
                    drop_console: true,
                    unsafe: true,
                    drop_debugger: true
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerHost: 'localhost',
                analyzerPort: 8889,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: false,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            })
        ]
    }
};
