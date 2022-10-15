import React from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectModal = () => {
  //把modal的状态放到url中进行全局管理
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const openModal = () => setProjectCreate({ projectCreate: true });
  const closeModal = () => setProjectCreate({ projectCreate: "" }); //关闭的时候不写false更美观
  return {
    //useSearchParams会把其他类型转化成string true=>"true"
    //modalOpen需要二次包装以供其他组件使用
    modalOpen: projectCreate === "true" ? true : false,
    openModal,
    closeModal,
  };
};
