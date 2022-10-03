import React from "react";
import ProjectListScreen from "screens/project-list";
import { useAuth } from "../context/auth-context";
import { Menu, Dropdown, Button } from "antd";
import styled from "@emotion/styled";
import { RowFlexEnd } from "../components/style";
import { ReactComponent as SoftwareLogo } from "../assets/software-logo.svg";

const AuthenticatedApp = () => {
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
    <Container>
      <Header spaceBetween={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"10rem"} color={"rgb(38, 132, 255)"} />
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

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

/* const PageHeader = styled.header`
background-color: gray;
height: 6rem;
`
const MainHeader = styled.header`
height: calc(100vh-6rem);
` */

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

export default AuthenticatedApp;
