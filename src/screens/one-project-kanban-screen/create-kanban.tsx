import { Input } from "antd";
import { Container } from "components/kanban-column";
import React, { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { useKanbansQueryKey, useProjectIdInUrl } from "./kanban-utils";

const CreateKanban = () => {
  const [name, setName] = useState("");

  //add kanban
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  const currentProjectId = useProjectIdInUrl();
  const submit = async () => {
    await addKanban({ name, projectId: currentProjectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};

export default CreateKanban;
