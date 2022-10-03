import React from "react";
import { Table } from "antd";
import dayjs from "dayjs";

interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: number;
}
interface Project {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
  key: string;
}
interface ListProps {
  users: User[];
  projectList: Project[];
}

//不使用antd
/* const oldList = ({ projectList, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>

      <tbody>
        {projectList.map((project) => {
          const { id, name, personId } = project;
          //通过psrsonId获取users中对应的personName
          //?.:防止出现undefined.name
          const personName =
            users.find((user) => user.id === personId)?.name || "未知";

          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{personName} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}; */

//使用antd
const List = ({ projectList, users }: ListProps) => {
  return (
    <div>
      <Table
        pagination={false}
        dataSource={projectList}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name), //localeCompare字符串比较 升序
          },
          {
            title: "部门",
            dataIndex: "organization",
            key: "organization",
          },
          {
            title: "负责人",
            dataIndex: "personId",
            key: "personId",
            render(dataIndex: number) {
              const personId = dataIndex;
              //通过psrsonId获取users中对应的personName
              //?.:防止出现undefined.name
              const personName =
                users.find((user) => user.id === personId)?.name || "未知";
              return <span key={personId}>{personName}</span>;
            },
          },
          {
            title: "创建时间",
            dataIndex: "created",
            key: "created",
            render(dataIndex: number) {
              return (
                <span>
                  {dataIndex ? dayjs(dataIndex).format("YYYY-MM-DD") : "无"}
                </span>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default List;
