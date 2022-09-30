import React from "react";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernamae">用户名</label>
        <input type="text" id="usernamae"></input>
        <label htmlFor="">密码</label>
        <input type="text" id="password"></input>

        <button type="submit">注册</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
