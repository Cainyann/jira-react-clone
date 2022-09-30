## use npx instead of npm

```
npx create-react-app jira --template -typescript
```

### 其他安装包

处理域名参数

> yarn add qs

## 自动格式化 prettier

https://prettier.io/docs/en/precommit.html

### 1. 安装

```
npm install --save-dev --save-exact prettier
```

Then, create an empty config file to let editors and other tools know you are using Prettier:

```
echo {}> .prettierrc.json
```

Next, create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:

```
# Ignore artifacts:
build
coverage
```

### 2.git 前自动格式化 Pre-commit Hook

Option 1. lint-staged

```
npx mrm@2 lint-staged
```

在 package.json 文档里找到 packagae.json 文档
添加扩展名

```
"lint-staged": {
    "*.{js,css,md，ts,tsx}": "prettier --write"
  }
```

### 3.解决 eslink 冲突

ESLint (and other linters)章节

```
yarn add eslint-config-prettier
```

package.json 中修改

```
"eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      "prettier"
    ]
  },
```

## json-sever

例子：

```
npm i json-server //安装
```

新建文件 db.json

```
{
  "users":[]
}
```

在 db.json 所在文件夹中启动服务器:

```
json-sever --watch db.json
```

就可以在 postman 上进行 get/post/patch 等测试请求

在该项目中：

```
yarn add json-sever -D //-D
```

在根目录下新建文件夹' **json_server_mock**',里面新建文件 db.json

```
{
  "users";[]
}
```

启动服务器:

```
json-sever --watch db.json
```

在 package.json 中 scripts 中新增

```
"json-server": "json-server __json_server_mock__/db.json --watch"
```

现在默认端口号 3000，为了不和 react-app 的端口冲突，先在 3001port 上

```
"json-server": "json-server __json_server_mock__/db.json --watch --port 3001"
```

使用 json-server

```
npm run json-server
```

mock 注意事项：

> 现在 fetch 里面是 mock 的 apiurl，为了避免项目上线的时候更改源代码的 url，在根目录下创建文件夹

```
.env   //上线后真实url  //npm run build的时候会读取这个
.env.development   //mock时url  //npm start的时候读取这个
```

读取 apiurl

```
const apiUrl = process.env.REACT_APP_API_URL
```

使用 middleware

```
 "json-server": "json-server --watch __json_server_mock__/db.json --port 3001 --middlewares __json_server_mock__/middleware.js"
```

## 路径问题

在 tsconifg.json 的"compilerOptions"中添加配置，从而绝对路径会从 src 往下找

```
 "baseUrl":"./src",
```
