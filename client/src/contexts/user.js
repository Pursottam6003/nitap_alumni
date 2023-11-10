import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Context = createContext();

const UserProvider = ({ children }) => {
  const { checkAuth, loading, error, isAdmin, profile } = useAuth();

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('/users/login', { email, password })
      if (res.status !== 200) {
        throw new Error(res.statusText);
      } else {
        checkAuth();
      }
    } catch (err) {
      throw err;
    }
  }

  const logout = () => {
    axios.post('/users/logout', { withCredentials: true }).then(res => {
      if (res.status === 200) {
        checkAuth();
      }
    }).catch(err => {
      throw err;
    })
  }

  const exposed = { profile, isAdmin, loading, checkAuth, error, login, logout }

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  )
}

export const useUser = () => useContext(Context);
export default UserProvider;