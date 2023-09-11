import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";

// create an auth hook to check for user authentication with jwt stored in Cookie and return the user object if authenticated else return null
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { setAdmin } = useContext(UserContext);

  const fetchAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/users/auth', { withCredentials: true });
      if (res.status !== 200 || res.data.error) {
        setIsAuth(false);
        setIsAdmin(!!!res.data.admin);
        setAdmin(!!!res.data.admin);
        throw new Error(res.statusText);
      } else {
        setIsAdmin(!!res.data.admin);
        setAdmin(!!res.data.admin);
        setIsAuth(true);
      }
    } catch (err) {
      setError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }

  useEffect(() => {
    fetchAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isAuth, isAdmin, loading, error }
}

export default useAuth;