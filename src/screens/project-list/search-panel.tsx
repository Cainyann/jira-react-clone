// /** @jsx jsx */
/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
  password: string;
}

interface SearchPanelProps {
  searchParam: {
    name: string;
    personId: string;
  };
  setSearchParam: (searchParam: SearchPanelProps["searchParam"]) => void;
  users: User[];
}

const SearchPanel = ({
  searchParam,
  setSearchParam,
  users,
}: SearchPanelProps) => {
  /* function handleSearch(e: any) {
    setSearchParam({ ...searchParam, name: e.target.value });
  }
  function handleSelect(e: any) {
    setSearchParam({ ...searchParam, personId: e.target.value });
  } */
  function handleSearch(e: any) {
    setSearchParam({ ...searchParam, name: e.target.value });
  }
  function handleSelect(value: string) {
    console.log(value);

    setSearchParam({ ...searchParam, personId: value });
  }

  return (
    <div>
      <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
        <Form.Item>
          <Input
            type="text"
            onChange={handleSearch}
            placeholder="项目名称"
          ></Input>
        </Form.Item>

        <Form.Item>
          <Select onChange={handleSelect} defaultValue="负责人">
            <Option value="" key="leader">
              负责人
            </Option>

            {users.map((user) => (
              <Option value={user.id} key={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchPanel;
