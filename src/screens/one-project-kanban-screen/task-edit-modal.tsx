import React, { useEffect } from "react";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import { Modal, Input, Form, Button } from "antd";
import EpicSelect from "components/epic-select";
import { useTaskEditModal } from "./kanban-utils";

const TaskEditModal = () => {
  const {
    closeTaskEditModal,
    editingTaskData,
    editingTaskId,
    editTask,
    deleteTask,
    editLoading,
  } = useTaskEditModal();

  const [form] = Form.useForm();

  const onCancel = () => {
    closeTaskEditModal();
  };

  // console.log(form.getFieldsValue()) //{name: 'hh', epicId: undefined, processorId: undefined, typeId: 7}
  const onOk = async () => {
    console.log(1);
    await editTask({ ...editingTaskData, ...form.getFieldsValue() });
    closeTaskEditModal();
  };

  // const startDelete = async () => {
  //     await deleteTask({id:editingTaskId})
  //     closeTaskEditModal()
  //     console.log(1)
  // }

  const startDelete = () => {
    closeTaskEditModal();
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除任务吗",
      onOk() {
        return deleteTask({ id: editingTaskId });
      },
    });
  };

  //form初始化为当前task数据
  useEffect(() => {
    form.setFieldsValue(editingTaskData);
  }, [editingTaskData, form]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTaskData} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"任务组"} name={"epicId"}>
          <EpicSelect defaultOptionName={"任务组"} />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={startDelete}
          style={{ fontSize: "14px" }}
          size={"small"}
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};

export default TaskEditModal;
