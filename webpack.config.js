const path = require('path'); 

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // we get the directory name and we create the path, we use the path core modules
        filename: 'bundle.js'
    },
    watch: true // bundle our code when we make changes
}