import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
const resolve = (dir: string) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  server: {
    //配置前端服务器地址和端口
    host: "", //主机号
    port: 3088, //端口号
    strictPort: false, //当端口被占用会直接退出而不是尝试用下一个
    open: false, //启动是自动打开
    //自定义代理后端服务器跨域
    // proxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:3000", //要请求的接口
    //     changeOrigin: true, //会在请求的时候更换成target地址
    //   },
    // },
  },
})
