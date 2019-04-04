module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 7',
                'Safari >= 7',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12'],
            add: true
        })
    ]
};
