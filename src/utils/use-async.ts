import { useState, useCallback } from "react";
interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

//D用于指定data的类型
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const config = { ...defaultConfig, ...initialConfig };

  //useState惰性初始化
  const [retry, setRetry] = useState(() => () => {}); //两层函数，这时候retry类型为:()=>void
  const setData = useCallback(
    (data: D) => setState({ data, error: null, status: "success" }),
    []
  );

  const setError = useCallback(
    (error: Error) => setState({ error, status: "error", data: null }),
    []
  );

  const asyncRun = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          asyncRun(runConfig?.retry(), runConfig);
        }
      });
      // 解决无限循环：setState({ ...state, status: "loading" });
      setState((prevState) => ({ ...prevState, status: "loading" }));
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // return error
          if (config.throwOnError) {
            //error需要被外部接收的情形
            return Promise.reject(error); //catch会消化异常，如果不主动抛出异常，外部就无法接收到异常
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    asyncRun,
    setData,
    setError,
    // 当retry 被调用时重新跑一遍asyncRun，让组件state刷新一遍
    retry,
    ...state, //包含status data error
  };
};
