import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  commentAtom,
  commentListAtom,
  validAtom,
} from "../../store/commentAtom";

export default function Comment() {
  const [comment, setComment] = useRecoilState(commentAtom);
  const [isValid, setIsValid] = useRecoilState(validAtom);
  const [commentList, setCommentList] = useRecoilState(commentListAtom);

  const postComment = (e) => {
    const newCommentList = [...commentList];
    newCommentList.push(comment);
    setCommentList(newCommentList);
    setComment("");
    if (comment.length === 0) {
      setIsValid(false);
      console.log(comment.length);
    } else if (comment.length >= 1) {
      setIsValid(true);
      console.log(isValid);
    }
  };
  return (
    <CommentContainer>
      <CommentTitleContainer>
        <CommentTitle>comment</CommentTitle>
      </CommentTitleContainer>

      <CommentFormContainer>
        <CommentProfile>프로필</CommentProfile>
        <CommentInput
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
      </CommentFormContainer>
      <CommentButtonContainer>
        {comment.length > 0 ? (
          <CommentButton
            style={{ backgroundColor: "black", color: "white" }}
            onClick={postComment}
          >
            댓글 입력
          </CommentButton>
        ) : (
          <CommentButton
            style={{ cursor: "default" }}
            disabled
            onClick={postComment}
          >
            댓글 입력
          </CommentButton>
        )}
      </CommentButtonContainer>
      {commentList.map((commentArr, i) => {
        return <CommentListContainer key={i}>{comment}</CommentListContainer>;
      })}
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor2};
`;

const CommentFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentProfile = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor2};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  color: white;
`;
const CommentInput = styled.textarea`
  width: 100%;
  border: none;
  height: 3vh;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor2};
  background-color: transparent;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.white};
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    display: none;
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
  color: ${({ theme }) => theme.colors.subColor2};
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
`;

const CommentListContainer = styled.div``;