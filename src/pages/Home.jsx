import React from "react";
import styled from "styled-components";

export default function Home() {
  return <HomeContainer></HomeContainer>;

}

const HomeContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.mainColor};

`;
