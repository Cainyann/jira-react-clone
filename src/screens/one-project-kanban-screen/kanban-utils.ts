import { useParams } from "react-router-dom";
import { useProject } from "utils/project";
import { useTaskTypes } from "utils/task-type";

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
