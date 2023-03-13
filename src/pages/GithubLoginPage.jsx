import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { loginUseMutationPostToken } from "../apis/queries/loginQuery";

const GithubLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: githubSendCode } = useMutation(
    "githubCode",
    (code) => loginUseMutationPostToken(code),
    {
      onSuccess: (res) => {
        console.log(res);
        navigate("/home");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    const code = location.search.split("=")[1];
    githubSendCode(code);
  }, []);
  return <div></div>;
};

export default GithubLoginPage;
