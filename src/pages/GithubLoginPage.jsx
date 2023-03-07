import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { loginUseMutationPostToken } from "../apis/queries/loginQuery";
import { loginGithubId } from "../store/userInfoAtom";

const GithubLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const setGithubId = useSetRecoilState(loginGithubId);

  const { mutate: githubSendCode } = useMutation(
    "githubCode",
    (code) => loginUseMutationPostToken(code),
    {
      onSuccess: (res) => {
        console.log(res);
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
