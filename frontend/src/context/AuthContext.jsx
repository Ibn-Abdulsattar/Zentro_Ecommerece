import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import userService from "../services/user.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState();
const [loading, setLoading] = useState(true);

const fetchUser = async () => {
  try {
    const response = await
    userService.profile();
    setUser(response.user);
  } catch (err) {
    console.error("Error fetching user:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ alert, setAlert, user, setUser, loading }}>
  {children}
</AuthContext.Provider>

  );
};

export const useAuth = () => useContext(AuthContext);
