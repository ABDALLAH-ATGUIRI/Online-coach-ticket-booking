import { createContext, useState } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const cookie = new Cookies();
  const [auth, setAuth] = useState({
    token: cookie.get("access-token") || false
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
