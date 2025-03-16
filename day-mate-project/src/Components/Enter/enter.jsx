import { useState, useEffect } from "react";
import Loader from "../Loading/loading";
import Login from "../Login/login";

const Enter = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <Loader /> : <Login />}</>;
};
export default Enter;
