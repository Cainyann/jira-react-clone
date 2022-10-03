import React, { useState, useEffect } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { cleanObject, useDebounce, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

const ProjectListScreen = () => {
  const [searchParam, setSearchParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(searchParam, 200);
  const [users, setUsers] = useState([]); //用户选项
  const [projectList, setProjectList] = useState([]); //展示列表
  const client = useHttp();

  //在搜索信息searchParams变化的时候请求接口fetch usersList
  useEffect(() => {
    /* // fetch(`${apiUrl}/projects?name=${searchParam.name}&id=${searchParam.personId}`)
    //当没有搜索参数的时候应显示全部list，在实际搜索时searchPanel的输入框和选择框可能有一个为空，应删去这个key
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(
      async (response) => {
        if (response.ok) {
          const data = await response.json();
          setProjectList(data);
        }
      }
    ); */
    client("projects", { data: cleanObject(debounceParam) }).then((data) =>
      setProjectList(data)
    );
  }, [debounceParam]);

  //组件挂载时fetch users
  /* useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    });
  }, []); */

  useMount(() => {
    /* fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    }) */
    client("users").then((data) => setUsers(data));
  });

  return (
    <Container style={{ width: "100%" }}>
      <h1>项目列表</h1>
      <SearchPanel
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        users={users}
      />
      <List projectList={projectList} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding-left: 3.2rem;
  padding-right: 3.2rem;
`;

export default ProjectListScreen;
