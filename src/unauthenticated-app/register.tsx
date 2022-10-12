import React from "react";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/use-async";

import { Button, Form, Input } from "antd";
const RegisterScreen = ({
  onError,
}: {
  onError: (errorMessage: String) => void;
}) => {
  const { register } = useAuth();
  const { asyncRun, isLoading } = useAsync(undefined, { throwOnError: true });

  /* const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    register({ username, password });
  }; */
  const handleSubmit = async ({
    cfPassword,
    ...values
  }: {
    username: string;
    password: string;
    cfPassword: string;
  }) => {
    //密码确认
    if (values.password !== cfPassword) {
      return onError(new Error("请确认两次输入的密码相同！").message);
    }
    try {
      await asyncRun(register(values));
    } catch (err) {
      onError((err as Error).message); //注意添加asyc和await否则onError立即执行，捕捉不到异步函数register的错误！！！
    }
  };

  return (
    <div>
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

        <Form.Item
          name="cfPassword"
          rules={[{ required: true, message: "请确认密码！" }]}
        >
          <Input.Password id="cfPassword" placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {" "}
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterScreen;
