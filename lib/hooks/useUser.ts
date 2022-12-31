import { me, refresh } from "./../api/auth";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<any>();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const fetchData = async () => {
    setIsLoadingUser(true);
    try {
      const res = await refresh();

      res && setIsUser(true);
      const resDataUser = await me();
      setUser(resDataUser?.data.name);
    } catch (error) {
      setIsUser(false);
    }
    setIsLoadingUser(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    user,
    isUser,
    isLoadingUser,
    setIsUser,
  };
};
