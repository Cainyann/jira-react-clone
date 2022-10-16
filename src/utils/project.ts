import { useCallback, useEffect } from "react";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { Project } from "types/projects";
import { cleanObject } from "utils";

//用于传入参数获取peojects相关数据
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { asyncRun, ...otherAsyncResults } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    //retry
    asyncRun(fetchProjects(), { retry: fetchProjects });
  }, [param, asyncRun, fetchProjects]);
  return otherAsyncResults;
};

//用于编辑project
export const useEditProject = () => {
  const { asyncRun, ...otherAsyncResults } = useAsync();
  const client = useHttp();
  //编辑项目 需要传入参数：被edit的project.id
  const editMutate = (params: Partial<Project>) => {
    return asyncRun(
      client(`projects/${params.id}`, { data: params, method: "PATCH" })
    );
  };
  return { editMutate, ...otherAsyncResults };
};

//用于添加project
export const useAddProject = () => {
  const { asyncRun, ...otherAsyncResults } = useAsync();
  const client = useHttp();
  //project改变 需要传入参数：被edit的project.id
  const addMutate = (params: Partial<Project>) => {
    return asyncRun(client(`projects/`, { data: params, method: "POST" }));
  };
  return { addMutate, ...otherAsyncResults };
};

//用于删除project
export const useDeleteProject = () => {
  const { asyncRun, ...otherAsyncResults } = useAsync();
  const client = useHttp();
  //project改变 需要传入参数：被delete的project.id
  const deleteMutate = (params: Partial<Project>) => {
    return asyncRun(
      client(`projects/${params.id}`, { data: params, method: "DELETE" })
    );
  };
  return { deleteMutate, ...otherAsyncResults };
};

//用于获取单个project数据
export const useProject = (id: number) => {
  const client = useHttp();
  const { asyncRun, ...otherAsyncResults } = useAsync<Project>();

  // const fetchProjects = useCallback(
  //   () => client(`projects/${id}`),
  //   [id,client]
  // );

  // asyncRun(client(`projects/${id}`))

  // const getOneProject = (id:number)=>{
  //   return asyncRun(client(`projects/${id}`))
  // }
  useEffect(() => {
    asyncRun(client(`projects/${id}`));
  }, [id, asyncRun, client]);
  return otherAsyncResults;
};
