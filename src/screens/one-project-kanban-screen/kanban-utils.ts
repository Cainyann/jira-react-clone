import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "utils/project";
import { useDeleteTask, useEditTask, useTask } from "utils/task";
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
  const [params] = useUrlQueryParam([
    "projectId",
    "name",
    "processorId",
    "typeId",
    "epicId",
  ]);
  //必须要有undefined！！！
  return useMemo(
    () => ({
      projectId,
      name: params.name || undefined,
      processorId: Number(params.processorId) || undefined,
      typeId: Number(params.typeId) || undefined,
      epicId: Number(params.epicId) || undefined,
    }),
    [params, projectId]
  );
};

//用于opmistic updates
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];
export const useTasksQueryKey = () => ["tasks", useKanbanTaskSearchParams()];

export const useTaskEditModal = () => {
  //点击task 把taskId保存到url中
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const openTaskEditMoadl = (id: number) =>
    setEditingTaskId({ editingTaskId: id });

  //关闭task
  const setSearchParams = useSetUrlSearchParam();
  const closeTaskEditModal = () => setSearchParams({ editingTaskId: "" });

  //获取当前task数据
  const { data: editingTaskData } = useTask(editingTaskId);

  //发送编辑task请求
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  //发送删除task请求
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  return {
    openTaskEditMoadl,
    closeTaskEditModal,
    editingTaskId: Number(editingTaskId),
    editingTaskData,
    editTask,
    deleteTask,
    editLoading,
  };
};
