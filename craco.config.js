//配置antd自定义

const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0,82,204)",
              "@font-size-base": "14px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
