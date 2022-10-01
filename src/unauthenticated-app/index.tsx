import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const handleClick = () => {
    setIsRegister((isRegister) => !isRegister);
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
