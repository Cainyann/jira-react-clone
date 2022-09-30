const apiUrl = process.env.REACT_APP_API_URL;

module.exports = (req, res, next) => {
  // res.header('HELLO!!!')
  // console.log(res);
  if (req.method === "POST" && req.url === `${apiUrl}/login`) {
    if (req.body.username === "Jack" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "999",
        },
      });
    }
  } else {
    return res.status(400).json({ message: "用户名或密码错误" });
  }
  next();
};
