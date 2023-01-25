import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

const GithubLoginPage = () => {
  const location = useLocation();

  useEffect(() => {
    const code = location.search.split("=")[1];
    console.log(typeof null);
    axios.post(`http://58.231.19.218:8000/user/social-login`, {
      token: code,
      status: "GITHUB",
    });
  }, [location.hash, location.search]);
  return <div></div>;
};

export default GithubLoginPage;
