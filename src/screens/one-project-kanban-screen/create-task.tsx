import { Card, Input } from "antd";
import React, { useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./kanban-utils";

const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const submit = async () => {
    await addTask({ name, kanbanId, projectId });
    setIsCreate(false);
    setName("");
  };
  const toggle = () => setIsCreate(!isCreate);

  return (
    <>
      {isCreate ? (
        <div onClick={toggle}>+创建事务</div>
      ) : (
        <Card>
          <Input
            onBlur={toggle}
            placeholder={"需要做些什么"}
            autoFocus={true}
            onPressEnter={submit}
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </Card>
      )}
    </>
  );
};

export default CreateTask;
