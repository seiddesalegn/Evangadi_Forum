import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);

        // Check token expiration
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          console.log("Token expired");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
