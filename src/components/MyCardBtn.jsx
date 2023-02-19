import React from "react";
import styled from "styled-components";

const MyCardBtn = ({ setClick }) => {
  const myCardOnClick = () => {
    setClick("click");
  };

  return <MyCardButton onClick={() => myCardOnClick()}>MyCard</MyCardButton>;
};

const MyCardButton = styled.button`
  position: fixed;
  top: 80vh;
  right: 5%;
  width: 100px;
  height: 50px;
`;

export default MyCardBtn;
