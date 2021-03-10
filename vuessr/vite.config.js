// import vuePlugin from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'

// // https://vitejs.dev/config/
// export default {
//   plugins: [
//     vuePlugin(),
//     vueJsx(),
//     {
//       name: 'virtual',
//       resolveId(id) {
//         if (id === '@foo') {
//           return id
//         }
//       },
//       load(id) {
//         if (id === '@foo') {
//           return `export default { msg: 'hi' }`
//         }
//       }
//     }
//   ],
//   build: {
//     minify: false
//   }
// }
const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    vuePlugin(),
    vueJsx(),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id) {
        if (id === '@foo') {
          return `export default { msg: 'hi' }`
        }
      }
    }
  ],
  build: {
    minify: false
  }
}
