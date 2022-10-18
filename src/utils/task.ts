/* task接口 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useDebounce } from "utils";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

//获取全部task / 根据task-params获取部分task数据
export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>("tasks", () => client("tasks", { data: params }));
};

//用于添加task
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

//用于根据taskId参数获取task相关数据
export const useTask = (taskId: number) => {
  const client = useHttp();
  return useQuery<Task>(["task", taskId], () => client(`tasks/${taskId}`));
};

//用于编辑task
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

//用于删除task
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
