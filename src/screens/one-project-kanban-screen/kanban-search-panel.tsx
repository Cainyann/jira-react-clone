import { Button, Input } from "antd";
import { RowFlexEnd } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useKanbanTaskSearchParams } from "./kanban-utils";

const KanbanSearchPanel = () => {
  const { name, processorId, typeId } = useKanbanTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const resetParams = () => {
    setSearchParams({
      name: undefined,
      processorId: undefined,
      taskType: undefined,
    });
  };

  return (
    <RowFlexEnd>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName="任务类型"
        value={typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={resetParams}>清除筛选器</Button>
    </RowFlexEnd>
  );
};

export default KanbanSearchPanel;
