import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import { Card, Button } from "antd";

const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const handleClick = () => {
    setIsRegister((isRegister) => !isRegister);
  };
  return (
    <div>
      <Card style={{ width: 400 }}>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={handleClick}>
          切换到{isRegister ? "登陆" : "注册"}
        </Button>
      </Card>
    </div>
  );
};

export default UnAuthenticatedApp;
