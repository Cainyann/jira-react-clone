//用于删除对象中的空值(undefined/null) 注意不包括0
//注意避免更改传入的函数
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (isFalsy(obj[key])) {
      delete result[key];
    }
  });
  return result;
};

//判断值是否为undefined/null 需要特殊处理0
export const isFalsy = (value) => {
  /* if(value===0)return false
    return !value */
  return value === 0 ? false : !value;
};
