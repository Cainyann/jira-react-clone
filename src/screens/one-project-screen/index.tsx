import styled from "@emotion/styled";
import { Menu } from "antd";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const useRouteType = () => {
  //console.log(useLocation().pathname) //'/projects/10/kanban'
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

const OneProjectScreen = () => {
  return (
    <Container>
      <Aside>
        <Menu
          mode="inline"
          defaultSelectedKeys={[useRouteType()]} //刷新url是kanban/tasks，保持kanban/tasks高亮
        >
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};
export default OneProjectScreen;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
  width: 100%;
`;
