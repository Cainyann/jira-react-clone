import { useState, useCallback } from "react";

// export const useUndo = <T>(initialPresent:T) => {
//     // const [present,setPresent] = useState(initialPresent)
//     // const [past, setPast] = useState<T[]>([])
//     // const [future, setFuture] = useState<T[]>([])

//     const canUndo = past.length !== 0
//     const canRedo = future.length !== 0

//     // const undo = () => {
//     //     //如果没有past，直接返回
//     //    if(!canRedo) return
//     //     //获取前一个
//     //     const previous = past[past.length-1]
//     //     //设置新的present、past、future
//     //     setPresent(previous)
//     //     setPast(past.slice(0,past.length-1))
//     //     setFuture([present,...future])
//     // }

//     // const reDo = () => {
//     //     if(!canRedo) return
//     //     //获取下一个
//     //     const next = future[0]
//     //     setPresent(next)
//     //     setFuture(future.slice(1,future.length))
//     //     setPast([...past,present])
//     // }

//     return(

//     )
// }

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({ past: [], present: initialPresent, future: [] });
  const { past, present, future } = state;

  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  const unDo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      //无past 返回当前state
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, past.length - 1),
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const reDo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1, future.length),
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    if (newPresent === present) {
      return state;
    }
    return {
      past: [...past, present],
      present: newPresent,
      future: [],
    };
  }, []);

  const reSet = useCallback((newPresnet: T) => {
    setState({
      past: [],
      present: newPresnet,
      future: [],
    });
  }, []);

  return [state, { unDo, reDo, set, reSet, canUndo, canRedo }];
};
