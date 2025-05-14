
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        app: './src/index.js' 
    },
    output: {
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    
    },
    plugins: [

        new HtmlWebpackPlugin({
            
            template: './src/todolist.html'
        })
    ],
    module: {
        rules: [
            
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
    
            },
            {
                test:/\.html$/i,
                use: "html-loader"
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.data$/i,
                use:"date-fns"
            }
            
        ]
    }


}