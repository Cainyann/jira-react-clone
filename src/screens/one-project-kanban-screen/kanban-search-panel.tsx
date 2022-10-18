import { Button, Col, Input, Row } from "antd";
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
    <Row gutter={32} justify="start">
      <Col>
        <Input
          style={{ width: "15rem" }}
          placeholder={"任务名"}
          value={name}
          onChange={(evt) => setSearchParams({ name: evt.target.value })}
        />
      </Col>
      <Col>
        <UserSelect
          defaultOptionName="经办人"
          value={processorId}
          onChange={(value) => setSearchParams({ processorId: value })}
        />
      </Col>

      <Col>
        <TaskTypeSelect
          defaultOptionName="任务类型"
          value={typeId}
          onChange={(value) => setSearchParams({ typeId: value })}
        />
      </Col>
      <Col>
        <Button onClick={resetParams}>清除筛选器</Button>
      </Col>
    </Row>
  );
};

export default KanbanSearchPanel;
