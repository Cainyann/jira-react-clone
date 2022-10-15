import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useProjectModal } from "screens/project-list-screen/project-modal-util";
import { ButtonNoPadding } from "./lib";

const ProjectPopover = () => {
  const { openModal } = useProjectModal();
  const { data: projects, retry } = useProjects();
  const pinedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {/* {props.projectModalButton} */}
      <ButtonNoPadding type="link" onClick={openModal}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content} onOpenChange={() => retry()}>
      <span>项目</span>
    </Popover>
  );
};
export default ProjectPopover;

const ContentContainer = styled.div`
  min-width: 15rem;
`;
