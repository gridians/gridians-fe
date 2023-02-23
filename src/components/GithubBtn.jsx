import React from "react";
import styled from "styled-components";

const GithubBtn = () => {
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/githubloginpage`;
  return (
    <GithubContainer>
      <Github href={loginUri}>연동하기</Github>
    </GithubContainer>
  );
};

const GithubContainer = styled.div`
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    padding: 0 20px;
  }
`;
const Github = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: black;
  &:hover {
    color: white;
    transition: all 0.5s;
  }
`;

export default GithubBtn;
