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
<<<<<<< HEAD

      <CommentListContainer>
        {commentList.map((commentArr, i) => {
          return (
            <CommentListWrapper key={i}>
              <CommentProfile>프로필</CommentProfile>
              <CommentList>{commentArr}</CommentList>
            </CommentListWrapper>
          );
        })}
      </CommentListContainer>
=======
      {commentList.map((commentArr, i) => {
        return <CommentListContainer key={i}>{comment}</CommentListContainer>;
      })}
>>>>>>> ee2a84fc93dc91ec5f02d102f78058231cdbbdba
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
<<<<<<< HEAD
  border-bottom: 1px solid white;
=======
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor2};
>>>>>>> ee2a84fc93dc91ec5f02d102f78058231cdbbdba
`;

const CommentFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentProfile = styled.div`
<<<<<<< HEAD
  border: 1px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
=======
  border: 1px solid ${({ theme }) => theme.colors.subColor2};
  border-radius: 50%;
  width: 70px;
  height: 70px;
>>>>>>> ee2a84fc93dc91ec5f02d102f78058231cdbbdba
  color: white;
`;
const CommentInput = styled.textarea`
  width: 100%;
  border: none;
  height: 3vh;
<<<<<<< HEAD
  border-bottom: 1px solid white;
=======
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor2};
>>>>>>> ee2a84fc93dc91ec5f02d102f78058231cdbbdba
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
<<<<<<< HEAD
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;
const CommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
=======
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
const CommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.subColor2};
>>>>>>> ee2a84fc93dc91ec5f02d102f78058231cdbbdba
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
`;

<<<<<<< HEAD
const CommentListContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const CommentListWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;
const CommentList = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-left: 10px;
`;
=======
const CommentListContainer = styled.div``;
>>>>>>> ee2a84fc93dc91ec5f02d102f78058231cdbbdba
