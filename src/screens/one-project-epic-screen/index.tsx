import { Button, List, Modal } from "antd";
import { RowFlexEnd, ScreenContainer } from "components/lib";
import React, { useState } from "react";

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Epic } from "types/epic";
import { useEpicScreen } from "./epic-screen-utils";
import CreateEpic from "./create-epic";

const OneProjectEpicScreen = () => {
  const [createEpic, setCreateEpic] = useState(false);
  //是否打开创建epic modal
  const openCreateEpic = () => setCreateEpic(true);
  const closeCreateEpic = () => setCreateEpic(false);

  const { currentProject } = useEpicScreen();

  return (
    <ScreenContainer>
      <CreateEpic createEpic={createEpic} closeCreateEpic={closeCreateEpic} />
      <RowFlexEnd spaceBetween={true}>
        <h1>{currentProject?.name} 任务组</h1>
        <Button type="link" onClick={openCreateEpic}>
          创建任务组
        </Button>
      </RowFlexEnd>
      <div style={{ overflow: "scroll" }}>
        <TasksList />
      </div>
    </ScreenContainer>
  );
};
export default OneProjectEpicScreen;

const TasksList = () => {
  const { deletEpic, thisProjectEpics, thisProjectTasks, projectId } =
    useEpicScreen();
  const confirmDeleteEpic = (epic: Epic) => {
    return Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deletEpic({ epicId: epic.id });
      },
    });
  };

  return (
    <List
      style={{ overflow: "scroll" }}
      itemLayout={"vertical"}
      dataSource={thisProjectEpics}
      renderItem={(epic) => (
        <List.Item>
          <List.Item.Meta
            title={
              <RowFlexEnd spaceBetween={true}>
                <span>{epic.name}</span>
                <Button onClick={() => confirmDeleteEpic(epic)} type={"link"}>
                  删除
                </Button>
              </RowFlexEnd>
            }
            description={
              <div>
                <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
              </div>
            }
          />

          {/* //获取task ： project --> (by projectId)epic --> (epicId)tasks */}
          <div>
            {thisProjectTasks
              ?.filter((task) => task.epicId === epic.id)
              .map((task) => (
                <div>
                  <Link
                    to={`/projects/${projectId}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                </div>
              ))}
            <br />
          </div>
        </List.Item>
      )}
    />
  );
};
