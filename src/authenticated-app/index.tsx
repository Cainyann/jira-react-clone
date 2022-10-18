import React from "react";
import ProjectListScreen from "screens/project-list-screen";
import { useAuth } from "../context/auth-context";
import { Route, Routes, Link } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import styled from "@emotion/styled";
import { RowFlexEnd } from "../components/style";
import { ReactComponent as SoftwareLogo } from "../assets/software-logo.svg";
import OneProjectScreen from "screens/one-project-screen";
import OneProjectKanbanScreen from "screens/one-project-kanban-screen";
import ProjectModal from "components/project-modal";
import ProjectPopover from "components/project-popover";
import OneProjectEpicScreen from "screens/one-project-epic-screen";
import UserPopover from "components/user-poppver";

const AuthenticatedApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false)

  // const projectModalButton = <ButtonNoPadding
  //   type="link" onClick={() => setProjectModalOpen(true)}>
  //   创建项目
  //    </ButtonNoPadding>

  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route index={true} element={<ProjectListScreen />} />
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<OneProjectScreen />}>
            <Route path="kanban" element={<OneProjectKanbanScreen />} />
            <Route path="" element={<OneProjectKanbanScreen />} />
            <Route path="epic" element={<OneProjectEpicScreen />} />
          </Route>
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
};
export default AuthenticatedApp;

const PageHeader = () => {
  return (
    <Header spaceBetween={true}>
      <HeaderLeft gap={true}>
        <Link to="/">
          <SoftwareLogo width={"10rem"} color={"rgb(38, 132, 255)"} />
        </Link>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  const menu = (
    <Menu>
      <Menu.Item key={"logout"}>
        <Button onClick={logout} type="link">
          退出
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button onClick={(e) => e.preventDefault()} type="link">
        Hi,{user?.name}
      </Button>
    </Dropdown>
  );
};

/* --------------------------------- 以下是样式--------------------------------- */

//从内容出发用flex，从布局出发用grid;一维用felx，二维用flex
//grid-area用来给子元素起名

const Container = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  height: 100vh;
  /* justify-items: stretch; */
  /* align-items: stretch; */
`;

// grid-area 用来给grid子元素起名字
const Header = styled(RowFlexEnd)`
  padding: 0 3.2rem 0 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(RowFlexEnd)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
