import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { User } from "../@Types";
import { auth } from "../firebase/index";

interface AuthContextData {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

export const ProviderAuthContext: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.whachUser(async (user) => {
      if (user) {
        Cookies.set("token", await user.getIdToken(), {
          path: "/",
          expires: 20,
        });
        setUser(auth.ConvertToUserCollection(user));
      } else {
        Cookies.set("token", {});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
