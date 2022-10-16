/* TaskTypes 接口 */
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { TaskType } from "types/task";

export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
