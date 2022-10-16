//获取看板接口文件
//用react-query

import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";

//根据kanban信息获取kanban数据
export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>("kanbans", () =>
    client("kanbans", { data: params })
  );
};
