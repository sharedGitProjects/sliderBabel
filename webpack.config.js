const path = require('path');
module.exports = {
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
        path: path.join(__dirname, 'src', 'build'),
        filename: 'script.js'
    },
    module: {
        rules: [
		    {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
		    {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: '/node_modules/'
            }
		]
    }
};