/* task接口 */

import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

//获取全部task / 根据task-params获取部分task数据
export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>("tasks", () => client("tasks", { data: params }));
};
