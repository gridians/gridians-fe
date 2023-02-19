import React from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { memberListuseMutationGetCardInfo } from "../apis/queries/memberListQuery";

const MyCardBtn = ({ setClick }) => {
  const { mutate: cardInfo, isLoading: cardInfoLoading } = useMutation(
    "d",
    () => memberListuseMutationGetCardInfo(),
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );

  const myCardOnClick = () => {
    cardInfo();
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
