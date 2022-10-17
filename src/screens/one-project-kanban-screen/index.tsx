import styled from "@emotion/styled";
import KanbanColumn from "components/kanban-column";
import { RowFlexEnd } from "components/lib";
import React from "react";
import { useParams } from "react-router-dom";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanSearchPanel from "./kanban-search-panel";
import { useCurrentProject, useProjectIdInUrl } from "./kanban-utils";

const OneProjectKanbanScreen = () => {
  useDocumentTitle("看板列表");
  //获取所有kanban
  const { data: kanbans } = useKanbans();
  //获取当前project
  const currentProject = useCurrentProject();

  return (
    <div>
      <h1>{currentProject?.name} 看板</h1>
      <RowFlexEnd marginBottom={2} gap={1}>
        <KanbanSearchPanel />
      </RowFlexEnd>
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
