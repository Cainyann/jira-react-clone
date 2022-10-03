import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/use-async";

import { Button, Form, Input } from "antd";

const LoginScreen = ({
  onError,
}: {
  onError: (errorMessage: String) => void;
}) => {
  const { login } = useAuth();
  const { asyncRun, isLoading } = useAsync(undefined, { throwOnError: true });
  console.log(isLoading);

  /*  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    login({ username, password });
  }; */
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await asyncRun(login(values));
    } catch (err) {
      onError((err as Error).message);
    }
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {" "}
            登陆{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;
