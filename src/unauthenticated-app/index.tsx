import { register } from "auth-provider-helper";
import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import LoginScreen from "./login";
import RegisterScreen from "./register";

const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const handleClick = () => {
    console.log(isRegister);
    setIsRegister((isRegister) => !isRegister);
    console.log(isRegister);
  };
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={handleClick}>
        切换到{isRegister ? "登陆" : "注册"}
      </button>
    </div>
  );
};

export default UnAuthenticatedApp;
