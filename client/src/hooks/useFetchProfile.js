import { useEffect, useState } from "react";
import axios from "axios";

const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const res = await axios.post('/users/profile', { withCredentials: true });
      if (res.status !== 200 || res.data.error) {
        setProfile(null);
        throw new Error(res.statusText);
      }
      if (res.data) setProfile(res.data?.profile);
    } catch (err) {
      setProfile(null);
      setError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, error, refetch: fetchProfile };
};

export default useFetchProfile;