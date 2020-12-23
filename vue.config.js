const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/vars.scss')
      ]
    },
    'babel-plugin-import': ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  },
  css: {
    sourceMap: true
  },
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: false
}
