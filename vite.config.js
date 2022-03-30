import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

// const localEnabled= (process.env.USE_MOCK) || false;
// const prodEnabled = (process.env.USE_CHUNK_MOCK) || false;

console.log(process, 'process')
export default defineConfig({
    plugins: [
        viteMockServe({
            mockPath: "mock",
            localEnabled: true,  // 开发打包开关
            prodEnabled: false, // 生产打包开关
            supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
            watchFiles: true, // 监视文件更改
        })
    ]
})
