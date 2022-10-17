/* 返回页面url中指定键的参数值 */
//利用useSearchParams在url中实现状态管理

import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

//输入参数名称数组，返回searchParams对象
//eg: const [params,setSearchParams] = useUrlQueryParam(["name","id","type"])
//setSearchParams({...params,name:"tom"})
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: any }),
      [searchParams, keys]
    ),
    (searchParams: Partial<{ [key in K]: unknown }>) => {
      // const o = cleanObject({...Object.fromEntries(searchParams),...searchParams}) as URLSearchParams
      // return setSearchParams(o)
      return setSearchParams(searchParams as URLSearchParams);
    },
  ] as const;
};

//返回setSearchParam函数
// eg:const setSearchParams = useSetUrlSearchParam()
//相比于上一个setSearchParams更简洁
//eg: setSearchParams({name:"tom"})
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
