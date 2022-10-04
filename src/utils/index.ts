import React, { useEffect, useState } from "react";

//用于删除对象中的空值(undefined/null) 注意不包括0
//注意避免更改传入的函数
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // const value = result[key as keyof Object]; //当obj:object时
    const value = result[key];
    if (isVoid(value)) {
      delete result[key as keyof Object];
    }
  });
  return result;
};

//判断值是否为undefined/null/'', 需要特殊处理0
//bug:false是有意义的 但返回true
export const isFalsy = (value: unknown): boolean => {
  /* if(value===0)return false
    return !value */
  return value === 0 ? false : !value;
};
//改进：value为undefined/null/''的时候无意义
export const isVoid = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

//用于useEffect里面组件挂载时
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

//useDebounce:解决载搜索框输入的时候useEffect监测到state变化导致fetch连续发出太多请求的问题
export const useDebounce = <V>(value: V, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    //每次在value变化的时候设置一个定时器以更改debounceValue
    let timeout = setTimeout(() => setDebounceValue(value), delay);
    //清除掉上一个(value变化是)useEffect留下来的timeout,从而最终只会保留最后一个timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

//用于更改页面标题
export const useDocumentTitle = (title: string, keepTitleUnmount: boolean) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);

  //判断卸载的时候是否保持title
  useEffect(() => {
    return () => {
      if (!keepTitleUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};

//debounce原理
// const debounce = (func,delay) => {
//   let timeout
//   return (...param) => {
//     if(timeout){
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       func()
//     },delay)
//   }
// }

// const log = debounce(()=>console.log(1),5000)
// log()
// log()
// log()
//...5s
//执行输出1

// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//             // 所以，log()#3 结束后，就只剩timeout#3在独自等待了
