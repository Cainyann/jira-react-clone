import { useEffect } from "react";
import { useHttp } from "./http";
import { User } from "../types/user";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";

export const useUsers = (searchParams?: Partial<User>) => {
  const client = useHttp();
  const { asyncRun, ...otherAsyncResults } = useAsync<User[]>();
  useEffect(() => {
    asyncRun(client("users", { data: cleanObject(searchParams || {}) }));
  }, [searchParams, client, asyncRun]);
  return otherAsyncResults;
};
//非状态非
