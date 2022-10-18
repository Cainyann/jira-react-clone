import {
  useCurrentProject,
  useProjectIdInUrl,
} from "screens/one-project-kanban-screen/kanban-utils";
import { Epic } from "types/epic";
import { useAddEpic, useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";

export const useEpicScreen = () => {
  //当前页面的projectId
  const projectId = useProjectIdInUrl();
  const currentProject = useCurrentProject();
  const { data: thisProjectEpics } = useEpics({ projectId: projectId });
  const { data: thisProjectTasks } = useTasks({ projectId: projectId });
  //获取task ： project --> (by projectId)epic --> (epicId)tasks

  //project-->(by projectId)epic
  //useDeleteEpic/useAddEpic 的queryKey：projectId
  const { mutateAsync: deletEpic } = useDeleteEpic([projectId]);

  //epic是添加到对应paroject下的，需要传入projectId
  const {
    mutateAsync: addMutate,
    error: addError,
    isLoading: addLoading,
  } = useAddEpic([projectId]);
  const addEpic = (valus: Partial<Epic>) => {
    return addMutate({ ...valus, projectId });
  };

  return {
    projectId,
    currentProject,
    thisProjectEpics,
    thisProjectTasks,
    deletEpic,
    addEpic,
    addError,
    addLoading,
  };
};
