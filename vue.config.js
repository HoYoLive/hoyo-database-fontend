const { defineConfig } = require('@vue/cli-service')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        resolvers: [ElementPlusResolver()]
      }),
      require('unplugin-auto-import/webpack')({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    proxy: 'http://localhost:5010'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/database/'
    : './'
})
