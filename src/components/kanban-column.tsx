import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Task } from "types/task";
import React from "react";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { useTaskTypes } from "utils/task-type";
import {
  useKanbansQueryKey,
  useKanbanTaskSearchParams,
  useTaskEditModal,
} from "screens/one-project-kanban-screen/kanban-utils";
import { useDebounce } from "utils";
import { useDeleteKanban } from "utils/kanban";
import { RowFlexEnd } from "./lib";
import CreateTask from "screens/one-project-kanban-screen/create-task";

const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  //获取所有tasks
  // const { data:allTasks} = useTasks(useKanbanTaskSearchParams());
  //对输入框值进行debounce处理
  const searchParams = useKanbanTaskSearchParams();
  const debounceParams = {
    ...searchParams,
    name: useDebounce(searchParams?.name, 200),
  };
  const { data: allTasks } = useTasks(debounceParams);

  //获取属于当前kanban的task
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  // const tasks = useMemo(() => (allTasks?.filter((task) => task.kanbanId === kanban.id)), [allTasks,kanban.id])

  return (
    <Container>
      <RowFlexEnd spaceBetween={true}>
        <h2>{kanban.name}</h2>
        <More kanban={kanban} />
      </RowFlexEnd>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};
export default KanbanColumn;

//根据task的typeId从taskTypes中获取对应类型名称icon
const TaskTypeIcon = ({ typeId }: { typeId: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const getTaskType = (typeId: number) => {
    const typeName = taskTypes?.find(
      (taskType) => taskType.id === typeId
    )?.name;
    return typeName;
  };
  return (
    <img
      alt={"task-icon"}
      src={getTaskType(typeId) === "task" ? taskIcon : bugIcon}
    />
  );
};

//每个task
const TaskCard = ({ task }: { task: Task }) => {
  //利用当前taskId打开携带task数据的editModal
  const { openTaskEditMoadl } = useTaskEditModal();
  return (
    <Card
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
      onClick={() => openTaskEditMoadl(task.id)}
    >
      <p>{task.name}</p>
      <TaskTypeIcon typeId={task.typeId} />
    </Card>
  );
};

//...删除键
const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return deleteKanban({ kanbanId: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 18rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  height: 100%;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
