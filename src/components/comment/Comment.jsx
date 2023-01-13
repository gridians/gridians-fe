import React from "react";
import styled from "styled-components";

export default function Comment() {
  return (
    <CommentContainer>
      <CommentTitleContainer>
        <CommentTitle>comment</CommentTitle>
      </CommentTitleContainer>

      <CommentFormContainer>
        <CommentForm>
          <CommentInput />
          <CommentButtonContainer>
            <CommentButton>버튼</CommentButton>
          </CommentButtonContainer>
        </CommentForm>
      </CommentFormContainer>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  width: 30%;
  height: 100%;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

const CommentTitleContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const CommentTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  color: ${({ theme }) => theme.colors.subColor1};
  font-weight: bold;
  border-bottom: 1px solid white;
`;

const CommentFormContainer = styled.div``;
const CommentForm = styled.form`
  width: 100%;
  padding: 10px;
`;
const CommentInput = styled.textarea`
  width: 100%;
  border: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.white};
  &:focus {
    outline: none;
  }
`;
const CommentButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
const CommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  width: 120px;
  height: 60px;
`;
