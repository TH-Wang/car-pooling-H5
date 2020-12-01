const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/vars.scss')
      ]
    }
  },
  css: {
    sourceMap: true
  },
  devServer: {
    disableHostCheck: true
  },
  productionSourceMap: false
}
