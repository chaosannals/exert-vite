import { defineConfig, loadEnv, ServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // process 依赖 @types/node 一些包会依赖，不一定需要显式引入。
  const env = loadEnv(mode, process.cwd());
  const proxyTarget = env['VITE_PROXY_BASE_URL'];

  const server: ServerOptions = {};

  if (proxyTarget) {
    server.proxy = {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
      },
    };
  }


  return defineConfig({
    server: server,

    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
      }),
    ],
  });
};
