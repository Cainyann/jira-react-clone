/* 返回页面url中指定键的参数值 */
//在url中实现状态管理

import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: any }),
      [searchParams]
    ),
    (searchParams: Partial<{ [key in K]: unknown }>) => {
      // const o = cleanObject({...Object.fromEntries(searchParams as URLSearchParams),...searchParams}) as
      // return setSearchParams(o)
      return setSearchParams(searchParams as URLSearchParams);
    },

    // setSearchParams
  ] as const;
};

/* export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const [stateKeys] = useState(keys);
    return [
      useMemo(
        () =>
          subset(Object.fromEntries(searchParams), stateKeys) as {
            [key in K]: string;
          },
        [searchParams, stateKeys]
      ),
      (params: Partial<{ [key in K]: unknown }>) => {
        return setSearchParams(params);
      },
    ] as const;
  };
  
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
  
 */
