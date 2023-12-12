import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const { user, setUser, socket, setSocket } = useContext(UserContext);

  return { user, setUser, socket, setSocket };
};
