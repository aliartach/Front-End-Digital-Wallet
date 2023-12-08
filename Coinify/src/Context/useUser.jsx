import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
};
