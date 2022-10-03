import React, { ReactNode, useState } from "react";
import * as auth from "../auth-provider-helper"; //login logout register等名字重了：import * as,用auth.login调用方法
import { http } from "../utils/http";
import { User } from "../screens/project-list/search-panel";
import { useMount } from "../utils/index";
import { useAsync } from "../utils/use-async";
import { FullPageLoading, FullPageError } from "../components/full-page";

interface AuthForm {
  username: string;
  password: string;
}

//问题：页面刷新的时候state中的user消失导致projectListScreen又回到登陆页面
//解决：刷新时初始化user
const bootstrapUser = async (): Promise<User> => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token }); //meApi的返回值包含user信息
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext"; //用于devtool

//provider函数
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    asyncRun,
    data: user,
    setData: setUser,
    isLoading,
    isIdle,
    isError,
    error,
  } = useAsync<User | null>();

  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(setUser); //point free
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
    });

  //初始化user
  useMount(() => {
    // bootstrapUser().then((user) => setUser(user)); //
    //改用useAsync
    asyncRun(bootstrapUser());
  });

  //在用户信息 me接口还没返回时展现Loading...
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  //在用户信息 me接口返回失败时
  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, logout, login, register }}
    />
  );
};

//把React.useContext(AuthContext)封装成useAuth
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
