import { Drawer } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list-screen/util";

// interface ProjectModalProps {
//     projectModalOpen:boolean,
//     openDrawer:()=>void,
// }

const ProjectModal = () => {
  const { modalOpen, closeModal } = useProjectModal();
  return (
    <Drawer visible={modalOpen} width="100%" onClose={closeModal}>
      project modal
    </Drawer>
  );
};
export default ProjectModal;
