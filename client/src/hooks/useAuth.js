import { useEffect, useState } from "react";
import axios from "axios";

// create an auth hook to check for user authentication with jwt stored in Cookie and return the user object if authenticated else return null
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/users/auth', { withCredentials: true });
      if (res.status !== 200 || res.data.error) {
        setIsAuth(false);
        throw new Error(res.statusText);
      } else {
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
  }, [])

  return { isAuth, loading, error }
}

export default useAuth;