import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState();
const [loading, setLoading] = useState(true);

const fetchUser = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_Backend_Url}/admin`, { withCredentials: true });
    setUser(res.data);
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
