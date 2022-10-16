import { Button, Drawer, Form, Input, Spin } from "antd";
import React, { useEffect } from "react";
import { useProjectModal } from "screens/project-list-screen/project-modal-util";
import { ErrorBox } from "./full-page";
import { UserSelect } from "./user-select";
import styled from "@emotion/styled";
import { useAddProject, useEditProject, useProjects } from "utils/project";

// interface ProjectModalProps {
//     projectModalOpen:boolean,
//     openDrawer:()=>void,
// }

const ProjectModal = () => {
  const {
    modalOpen,
    closeModal,
    editingProjectId,
    editingProjectData,
    modalLaoding,
    error,
  } = useProjectModal();

  const title = editingProjectId ? "编辑项目" : "创建项目";
  const [form] = Form.useForm();

  const { editMutate, isLoading: editLoadig } = useEditProject();
  const { addMutate, isLoading: addLoading } = useAddProject();
  const onFinish = (values: any) => {
    // console.log(values) //{name: 'mm', organization: 'mm', personId: undefined}
    (editingProjectId
      ? editMutate({ id: editingProjectId, ...values })
      : addMutate(values)
    ).then(() => {
      form.resetFields();
      closeModal();
    });
  };
  const submitLoading = editingProjectId ? editLoadig : addLoading;

  const close = () => {
    form.resetFields();
    closeModal();
  };

  useEffect(() => {
    form.setFieldsValue(editingProjectData);
  }, [editingProjectData, form]);

  return (
    <Drawer visible={modalOpen} width="100%" onClose={close} forceRender={true}>
      <Container>
        {modalLaoding ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={submitLoading}
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
export default ProjectModal;

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
