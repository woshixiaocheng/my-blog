import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import Components from 'unplugin-vue-components/vite' // 按需加载自定义组件
import { ElementPlusResolver} from 'unplugin-vue-components/resolvers'

const resolve = (dir: string) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  
  esbuild:{
//打包时去除console
drop:["console"]
  },
  plugins: [vue(), // 按需引入
  Components({
    dts: true,
    dirs: ['src'], // 按需加载的文件夹
    resolvers: [
        ElementPlusResolver(),  //   按需加载
    ],
    directoryAsNamespace: true,//解决组件冲突问题，因为这里获取组件的名字是获取文件名的
  })
],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },

  server: {
    //配置前端服务器地址和端口
    host: "", //主机号
    port: 8888, //端口号
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
