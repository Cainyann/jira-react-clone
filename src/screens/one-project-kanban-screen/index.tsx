import styled from "@emotion/styled";
import KanbanColumn from "components/kanban-column";
import { ScreenContainer } from "components/lib";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import CreateKanban from "./create-kanban";
import KanbanSearchPanel from "./kanban-search-panel";
import { useCurrentProject } from "./kanban-utils";
import TaskEditModal from "./task-edit-modal";

const OneProjectKanbanScreen = () => {
  useDocumentTitle("看板列表");
  //获取所有kanban
  const { data: kanbans } = useKanbans();
  //获取当前project
  const currentProject = useCurrentProject();

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} 看板</h1>
      <KanbanSearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <div>
            <KanbanColumn kanban={kanban} key={kanban.id} />
          </div>
        ))}
        <CreateKanban />
      </ColumnsContainer>
      <TaskEditModal />
    </ScreenContainer>
  );
};
export default OneProjectKanbanScreen;

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  margin-top: 1.5rem;
`;
