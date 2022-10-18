//获取看板接口文件
//用react-query

import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

//根据kanban信息获取kanban数据
export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>("kanbans", () =>
    client("kanbans", { data: params })
  );
};

//用于添加kanban
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

//用于删除kanban
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ kanbanId }: { kanbanId: number }) =>
      client(`kanbans/${kanbanId}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
