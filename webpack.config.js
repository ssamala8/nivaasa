const path = require('path');


module.exports = {
    entry: './src/index.js', // Entry point of your application
    output: {
        filename: 'index.js', // Output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the output directory before emit
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JS files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel for transpiling
                },
            },
            {
                test: /\.css$/, // Load CSS files
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Load images
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        static: './dist', // Serve from dist directory
        port: 3000, // Dev server port
        open: true, // Open browser on start
    },
    mode: 'development', // Set mode to development
};