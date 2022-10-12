import { useHttp } from "./http";
import { User } from "../types/user";
import { useQuery } from "react-query";

export const useUsers = (searchParams?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>("users", () =>
    client("users", { data: searchParams })
  );
};
