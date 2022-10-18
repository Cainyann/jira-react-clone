import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
/* 任务组epics接口 */

export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();
  return useQuery<Epic[]>("epics", () => client("epics", { data: params }));
};

//用于添加epic
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

//用于删除epic
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ epicId }: { epicId: number }) =>
      client(`epics/${epicId}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
