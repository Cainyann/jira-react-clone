import React from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    //post必须要有method headers
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response: Response) => {
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernamae">用户名</label>
        <input type="text" id="usernamae"></input>
        <label htmlFor="">密码</label>
        <input type="text" id="password"></input>

        <button type="submit">登陆</button>
      </form>
    </div>
  );
};

export default LoginScreen;
