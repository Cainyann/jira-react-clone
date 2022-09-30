import React from "react";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const { user, login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <div>
      {/* {user? <div>登陆成功！username:{user?.name}
      token:{user?.token}
      </div> : null} */}

      <form onSubmit={handleSubmit}>
        <label htmlFor="usernamae">用户名</label>
        <input type="text" id="usernamae"></input>
        <label htmlFor="">密码</label>
        <input type="text" id="password"></input>

        <button type="submit">登陆</button>
      </form>
    </div>
  );
};

export default LoginScreen;
