const path = require('path')

module.exports = {
    lintOnSave:false,
    devServer:{
        proxy:'http://192.168.2.49:3000'
    },
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', path.join(__dirname, 'src'));
    },
}