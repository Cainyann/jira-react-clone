import React from "react";
import { Link } from "react-router-dom";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "types/user";
import { Project } from "types/projects";
import { Star } from "components/star";
import { useEditProject } from "utils/project";

//透传
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
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
const List = ({ users, ...props }: ListProps) => {
  const { editMutate } = useEditProject();
  // const editProjectPin = (id:number,pin:boolean)=>editMutate({id,pin})
  //改进：函数科里化
  const editProjectPin = (id: number) => (pin: boolean) =>
    editMutate({ id, pin }).then(props.refresh); //编辑后刷新重新获取
  return (
    <div>
      <Table
        {...props}
        pagination={false}
        columns={[
          {
            title: <Star checked={true} disabled={true} />,
            render(value, project) {
              return (
                <Star
                  checked={project.pin}
                  // onCheckedChange={pin=>editProjectPin(project.id,pin)}
                  //函数科里化
                  onCheckedChange={editProjectPin(project.id)}
                />
              );
            },
          },
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name), //localeCompare字符串比较 升序
            render(value, project) {
              return <Link to={`/projects/${project.id}`}>{project.name}</Link>;
            },
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
                users?.find((user) => user.id === personId)?.name || "未知";
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
