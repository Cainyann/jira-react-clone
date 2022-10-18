import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { useUsers } from "utils/user";

const UserPopover = () => {
  const { data: users } = useUsers();

  const content = (
    <ContentContainer>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>执行人</span>
    </Popover>
  );
};
export default UserPopover;

const ContentContainer = styled.div`
  min-width: 15rem;
`;
