import React from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { useDebounce, useDocumentTitle } from "../../utils/index";
import { useUrlQueryParam } from "../../utils/url";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [searchParam, setSearchParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(searchParam, 300);
  // const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState<Error | null>(null);
  // const [users, setUsers] = useState([]); //用户选项
  // const [projectList, setProjectList] = useState([]); //展示列表
  // const client = useHttp();
  const { data: users } = useUsers();
  const {
    isLoading,
    error,
    data: projectList,
    retry,
  } = useProjects(debounceParam);

  //在搜索信息searchParams变化的时候请求接口fetch usersList
  // useEffect(() => {
  //   /* // fetch(`${apiUrl}/projects?name=${searchParam.name}&id=${searchParam.personId}`)
  //   //当没有搜索参数的时候应显示全部list，在实际搜索时searchPanel的输入框和选择框可能有一个为空，应删去这个key
  //   fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
  //     async (response) => {
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProjectList(data);
  //       }
  //     }
  //   ); */

  //   setIsLoading(true);
  //   client("projects", { data: cleanObject(debounceParam) })
  //     .then((data) => setProjectList(data))
  //     .catch((error) => {
  //       setProjectList([]);
  //       setErr(error);
  //     })
  //     .finally(() => setIsLoading(false));
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParam]);

  //组件挂载时fetch users
  /* useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    });
  }, []); */

  // useMount(() => {
  //   /* fetch(`${apiUrl}/users`).then(async (response) => {
  //     if (response.ok) {
  //       const data = await response.json();
  //       setUsers(data);
  //     }
  //   }) */
  //   client("users").then((data) => setUsers(data));
  // });

  return (
    <Container style={{ width: "100%" }}>
      <h1>项目列表</h1>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users || []}
      />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        users={users || []}
        dataSource={projectList || []}
        loading={isLoading}
        refresh={retry}
      />
    </Container>
  );
};

const Container = styled.div`
  /* padding-left: 3.2rem; */
  /* padding-right: 3.2rem; */
  padding: 1.2rem 3.2rem 1.2rem 3.2rem;
`;

export default ProjectListScreen;
