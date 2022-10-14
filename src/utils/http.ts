//实现通用的异步请求方法
//在headers里面携带token来解决401 (Unauthorized)
import { useCallback } from "react";
import qs from "qs";
import * as auth from "../auth-provider-helper";
import { useAuth } from "../context/auth-context";

interface Config extends RequestInit {
  token?: string;
  data?: Object;
}
const apiUrl = process.env.REACT_APP_API_URL;

//关于类型可以查看http参数设定，考虑到RequestInit上没有token等，再进行extends
export const http = async (
  endpoint: string,
  { headers, data, token, ...customConfigs }: Config = {}
) => {
  //给config一个默认值 后面传参可以只传endpoint

  const config = {
    //默认参数
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "appliication/json" : "",
    },
    //携带参数，会覆盖上面的
    ...customConfigs,
  };
  //GET请求的时候参数data需要带到url里面，POST请求是带到body里面
  if (config.method.toUpperCase() === "GET") {
    //比如：把 searchParam{name: "t",personId: "1"}转化成'name=t&paersonId=1',
    endpoint += `?${qs.stringify(data || {})}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      //unauthorized
      if (response.status === 401) {
        //退出并重新登陆
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登陆" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

//携带token：利用useAuth()实现自动传入token
export const useHttp = () => {
  const { user } = useAuth();
  //utility type: Parameters
  //这里的typeof是在静态环境中运行的，区别与js中的typeof是在runtime运行的
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
