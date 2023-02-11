import axios from "axios";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation,useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { loginGithubId } from "../store/userInfoAtom";

const GithubLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [githubId,setGithubId] = useRecoilState(loginGithubId);

  useEffect(() => {
    const code = location.search.split("=")[1];
    console.log(code);
    axios.post(`http://116.123.153.248:8000/user/auth/social-login`, {
      token: code
    }).then((data)=>{
      console.log("ok",data.data);
    }).catch((err)=>{
      console.log(err.response.data.message);
      if(err.response.data.message === "git id not found"){
        setGithubId(err.response.data.param);
        navigate("/signup");
      }
    })
  }, [location.hash, location.search, navigate, setGithubId]);
  return <div></div>;
};

export default GithubLoginPage;
