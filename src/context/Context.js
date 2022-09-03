/** @format */

import { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider(props) {
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ user, setUser }}>
      {props.children}
    </Context.Provider>
  );
}
