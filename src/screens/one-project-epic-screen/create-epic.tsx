import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, Spin } from "antd";
import { useEpicScreen } from "./epic-screen-utils";
import { ErrorBox } from "components/full-page";
import styled from "@emotion/styled";

const CreateEpic = ({
  createEpic,
  closeCreateEpic,
}: {
  createEpic: boolean;
  closeCreateEpic: () => void;
}) => {
  const { addEpic, addError, addLoading } = useEpicScreen();

  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [form, createEpic]);

  const onFinish = () => {
    addEpic(form.getFieldsValue());
    closeCreateEpic();
  };
  console.log(form.getFieldsValue());

  return (
    <Drawer
      visible={createEpic}
      onClose={closeCreateEpic}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {addLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={addError} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={addLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

export default CreateEpic;

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
