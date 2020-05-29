### 快速上手React+TypeScript+Redux技术栈

1. 全局安装 create-react-app
npm install -g create-react-app

2. 初始化 my-app 项目，自动安装依赖
npx create-react-app my-app --scripts-version=react-scripts-ts

3. 安装包管理工具yarn
https://yarnpkg.com/lang/zh-hans/docs/install/#windows-stable
上面是下载网站，安装后通过cmd打开，执行：
yarn -v
查看是否安装成功，用vscode打开的终端可能找不到yarn

4. 安装所需依赖包
yarn add history @types/history react-router-dom @types/react-router-dom react-router-redux @types/react-router-redux redux-actions @types/redux-actions redux-thunk @types/redux-thunk redux --D

3. 启动react
npm run start