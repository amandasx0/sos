import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      token: null,
      login: () => {},
      logout: () => {},
    };
  }

  return context;
};
