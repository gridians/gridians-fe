import React from "react";
import styled from "styled-components";

const GithubBtn = () => {
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/githubloginpage`;
  return (
    <Github href={loginUri}>
      <img src="Github.svg" alt="Github" />
    </Github>
  );
};

const Github = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  img {
    width: 100%;
    height: 90%;
  }
`;

export default GithubBtn;
