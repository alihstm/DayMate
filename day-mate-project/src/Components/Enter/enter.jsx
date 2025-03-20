import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loading/loading";

const Enter = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <>{loading ? <Loader /> : null}</>;
};

export default Enter;
