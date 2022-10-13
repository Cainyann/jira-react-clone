import React from "react";
import { Rate } from "antd";

//利用antd中的Rate封装收藏按键，功能：点击添加/取消收藏
//方便透传
interface StarProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Star = (props: StarProps) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(checked) => onCheckedChange?.(Boolean(checked))}
      {...restProps}
    />
  );
};
