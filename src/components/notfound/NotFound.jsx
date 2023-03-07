import React from "react";
import styled from "styled-components";

export default function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404 페이지를 찾을 수 없습니다.</NotFoundTitle>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-color: #0e0909;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundTitle = styled.span`
  font-size: 4em;
  color: white;
`;
