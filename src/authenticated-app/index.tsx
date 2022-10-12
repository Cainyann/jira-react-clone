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
import OneProjectTasksScreen from "screens/one-project-tasks-screen";

const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route index={true} element={<ProjectListScreen />} />
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<OneProjectScreen />}>
            <Route path="view" element={<OneProjectKanbanScreen />} />
            <Route path="tasks" element={<OneProjectTasksScreen />} />
          </Route>
        </Routes>
      </Main>
    </Container>
  );
};
export default AuthenticatedApp;

const PageHeader = () => {
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
    <Header spaceBetween={true}>
      <HeaderLeft gap={true}>
        <Link to="/">
          <SoftwareLogo width={"10rem"} color={"rgb(38, 132, 255)"} />
        </Link>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={menu}>
          <Button onClick={(e) => e.preventDefault()} type="link">
            Hi,{user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
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
