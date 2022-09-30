import React from "react";

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
  function handleSearch(e: any) {
    setSearchParam({ ...searchParam, name: e.target.value });
  }
  function handleSelect(e: any) {
    setSearchParam({ ...searchParam, personId: e.target.value });
  }
  return (
    <div>
      <form action={""}>
        <input type="text" onChange={handleSearch}></input>

        <select onChange={handleSelect}>
          <option value="">负责人</option>

          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SearchPanel;
