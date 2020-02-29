module.exports = {
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'notwork':'@/notwork',
        'views':'@/views',
      }
    }
  }
}