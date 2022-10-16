import styled from "@emotion/styled";
import KanbanColumn from "components/kanban-column";
import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useCurrentProject, useProjectIdInUrl } from "./kanban-utils";

const OneProjectKanbanScreen = () => {
  useDocumentTitle("看板列表");
  //获取所有kanban
  const { data: kanbans } = useKanbans();
  //获取当前project
  const currentProject = useCurrentProject();

  console.log(kanbans);

  return (
    <div>
      <h1>{currentProject?.name} 看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <div>
            <KanbanColumn kanban={kanban} key={kanban.id} />
          </div>
        ))}
      </ColumnsContainer>
    </div>
  );
};
export default OneProjectKanbanScreen;

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
