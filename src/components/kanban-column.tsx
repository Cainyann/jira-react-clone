import styled from "@emotion/styled";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Task } from "types/task";
import React from "react";
import { Card } from "antd";
import { useTaskTypes } from "utils/task-type";

const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  //获取所有tasks
  const { data: allTasks } = useTasks();
  //获取属于当前kanban的task
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  //task对应的icon
  return (
    <Container>
      <h2>{kanban.name}</h2>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
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

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card style={{ marginBottom: "0.5rem", cursor: "pointer" }} key={task.id}>
      <p>{task.name}</p>
      <TaskTypeIcon typeId={task.typeId} />
    </Card>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
