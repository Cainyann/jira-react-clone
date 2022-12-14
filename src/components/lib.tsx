//封装一些常用的样式组件

import styled from "@emotion/styled";
import { Button } from "antd";

//一行
export const RowFlexEnd = styled.div<{
  gap?: number | boolean;
  spaceBetween?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : undefined};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

//去掉antd-Button的padding
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

//screen
export const ScreenContainer = styled.div`
  padding: 2.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
