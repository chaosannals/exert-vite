# exert-vite

## 一些错误的解决

注：此方法在更高级的 npm 版本无效，仅换代的前几个版本可以这么解决，建议使用 yarn 替代 npm 使得和官方开发 vite 使用的工具一致。

在 npm v7 里 package-lock.json 升级了。
可以看到 "lockfileVersion": 2 的设置。
这样导致 esbuild.exe 不存在。
解决这个问题的方式有两种：

1. 把 lockfileVersion 改成 1 重新 npm i。此时 lockfileVersion 会被 npm 改回 2 并补上缺失的 "hasInstallScript": true
2. 直接找到 node_modules/esbuild 的配置，添加 "hasInstallScript": true
