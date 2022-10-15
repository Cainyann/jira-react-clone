import React from "react";
import { useProjects } from "utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

//把modal的状态放到url中进行全局管理

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const { data: editingProjectData, isLoading: editingLoading } = useProjects({
    id: editingProjectId,
  });

  const setSearchParams = useSetUrlSearchParam();
  const openModal = () => setProjectCreate({ projectCreate: true });
  // const closeModal = () => setProjectCreate({ projectCreate: "" });
  //关闭的时候不写false更美观
  const closeModal = () =>
    setSearchParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    //useSearchParams会把其他类型转化成string true=>"true"
    //modalOpen需要二次包装以供其他组件使用
    modalOpen:
      projectCreate === "true" || Boolean(editingProjectId) ? true : false,
    openModal,
    closeModal,
    startEdit,
    editingProjectId,
    editingProjectData,
    editingLoading,
  };
};
