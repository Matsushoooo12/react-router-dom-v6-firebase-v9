import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login", { replace: true });
    window.location.reload();
  };
  React.useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/home");
    }
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default Home;
