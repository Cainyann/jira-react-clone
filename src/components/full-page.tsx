import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />{" "}
    </FullPage>
  );
};

export const ErrorBox = ({ error }: { error: Error | null }) => {
  return <Typography.Text type="danger">{error?.message}</Typography.Text>;
};
export const FullPageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <ErrorBox error={error} />
    </FullPage>
  );
};
