import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt_token") || null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(decodedToken);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("jwt_token", token);
    setToken(token);
  };

  const logout = (clearCart) => {
    localStorage.removeItem("jwt_token");
    setToken(null);
    setUser(null);
    if (clearCart) clearCart();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
