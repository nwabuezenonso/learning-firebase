const path = require('path'); 
const dotenv = require('dotenv-webpack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // we get the directory name and we create the path, we use the path core modules
        filename: 'bundle.js'
    },
    watch: true, // bundle our code when we make changes
    // module: {
    //     loaders: [
    //         {  
    //             test: /\.js$/,
    //             exclude: 'node_modules',
    //             loader: 'babel',
    //             query: {presets: ['es2015']},
    //         }
    //     ]
    // },
    // target: 'node'
}