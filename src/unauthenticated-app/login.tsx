import React from "react";
import { useAuth } from "../context/auth-context";

import { Button, Form, Input } from "antd";

const LoginScreen = () => {
  const { login } = useAuth();

  /*  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    login({ username, password });
  }; */
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <div>
      {/* {user? <div>登陆成功！username:{user?.name}
      token:{user?.token}
      </div> : null} */}

      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名！" }]}
        >
          <Input id="usernamae" placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input.Password id="password" placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {" "}
            登陆{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;