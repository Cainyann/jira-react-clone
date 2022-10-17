import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { TaskType } from "types/task";
import { useProject } from "utils/project";
import { useTaskTypes } from "utils/task-type";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

//从当前url中获取当前projectId
export const useProjectIdInUrl = () => {
  //     const { pathname } = useLocation();
  //   const id = pathname.match(/projects\/(\d+)/)?.[1];
  //   return Number(id);
  const { projectId } = useParams();
  return Number(projectId);
};

//根据projectId获取当前project
export const useCurrentProject = () => {
  const { data: currentProject } = useProject(useProjectIdInUrl());
  return currentProject;
};

//kanban返回task的url：.../projects/10/kanban?name=管理&processorId=1&typeId=1
//search-panel需要的搜索参数：name，prosessorId，typeId
export const useKanbanTaskSearchParams = () => {
  const projectId = useProjectIdInUrl();
  const [params] = useUrlQueryParam(["name", "processorId", "typeId"]);
  //必须要有undefined！！！
  return useMemo(
    () => ({
      // projectId,
      name: params.name || undefined,
      processorId: Number(params.processorId) || undefined,
      typeId: Number(params.typeId) || undefined,
    }),
    [params]
  );
};
//
