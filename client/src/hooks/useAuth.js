import { useEffect, useState } from "react";
import { apiPostCall } from "../utils/helpers";

const baseUrl = "http://localhost:5000/users";
const authApi = apiPostCall(baseUrl)("/auth");

// create an auth hook to check for user authentication with jwt stored in Cookie and return the user object if authenticated else return null
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    authApi({ withCredentials: true }).then(res => {
      console.log(res.data);
      setUser(res.data);
    }).catch(err => {
      setError(err);
      console.error(err);
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  return { user, loading, error }
}

export default useAuth;