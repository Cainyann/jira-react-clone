import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const OneProjectScreen = () => {
  const { projectId } = useParams();

  return (
    <>
      This is project{projectId}
      侧边栏
      <div>
        <Link to="view">view</Link>
        <br />
        <Link to="tasks">tasks</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default OneProjectScreen;
