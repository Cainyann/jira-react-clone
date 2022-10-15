// /** @jsx jsx */
/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, Input, Select } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "types/projects";
import { User } from "types/user";

const { Option } = Select;

interface SearchPanelProps {
  users: User[];
  searchParam: Partial<Pick<Project, "name" | "personId">>;
  setSearchParam: (searchParam: SearchPanelProps["searchParam"]) => void;
}

const SearchPanel = ({ searchParam, setSearchParam }: SearchPanelProps) => {
  /* function handleSearch(e: any) {
    setSearchParam({ ...searchParam, name: e.target.value });
  }
  function handleSelect(e: any) {
    setSearchParam({ ...searchParam, personId: e.target.value });
  } */
  function handleSearch(e: any) {
    setSearchParam({ ...searchParam, name: e.target.value });
  }
  function handleSelect(value: number | undefined) {
    setSearchParam({ ...searchParam, personId: value });
  }

  return (
    <div>
      <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
        <Form.Item>
          <Input
            type="text"
            onChange={handleSearch}
            value={searchParam.name}
            placeholder="项目名称"
          ></Input>
        </Form.Item>

        <Form.Item>
          {/* <Select onChange={handleSelect} defaultValue={"leader"} >
            <Option value={"leader"} key={"leader"}>{"负责人"}</Option>
          
            {users.map((user) => (
              <Option value={user.id} key={user.id}>
                {user.name}
              </Option>
            ))}
          </Select> */}

          <UserSelect
            defaultOptionName={"负责人"}
            value={searchParam.personId}
            onChange={handleSelect}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchPanel;
