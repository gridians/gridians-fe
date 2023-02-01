import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  commentAtom,
  commentListAtom,
  getUserComment,
  validAtom,
} from "../../store/commentAtom";

export default function Comment() {
  const [comment, setComment] = useRecoilState(commentAtom);
  const [isValid, setIsValid] = useRecoilState(validAtom);
  const [commentList, setCommentList] = useRecoilState(commentListAtom);
  const [replyComment, setReplyComment] = useState("");
  const [replyCommentList, setReplyCommentList] = useState([]);
  const [replyValid, setReplyValid] = useState(false);
  const textRef = useRef();
  const replyCommentRef = useRef();
  const commentArray = useRecoilValue(getUserComment);

  // console.log(commentArray);

  const postComment = () => {
    const newCommentList = [...commentList];
    newCommentList.push(comment);
    setCommentList(newCommentList);
    setComment("");
    if (comment.length === 0) {
      setIsValid(false);
    } else if (comment.length >= 1) {
      setIsValid(true);
    }
  };

  const postReplyComment = () => {
    const newReplyComment = [...replyComment];
    newReplyComment.push(replyComment);
    setReplyCommentList(newReplyComment);
    setReplyComment("");
    if (newReplyComment.length === 0) {
      setReplyValid(false);
    } else if (newReplyComment.length >= 1) {
      setReplyValid(true);
    }
    console.log(replyValid);
  };

  const onClick = () => {
    setReplyValid(!replyValid);
    console.log(replyValid);
  };

  const handleResizeHeight = useCallback(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = "23px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const handleReplyCommentResizeHeight = useCallback(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = "23px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
    replyCommentRef.current.disabled = false;
    replyCommentRef.current.focus();
  }, []);

  return (
    <CommentContainer>
      <CommentTitleContainer>
        <CommentTitle>댓글</CommentTitle>
      </CommentTitleContainer>

      <CommentFormContainer>
        <CommentProfile>프로필</CommentProfile>
        <CommentInput
          type="text"
          placeholder="댓글 입력하기.."
          ref={textRef}
          onInput={handleResizeHeight}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <CommentButtonContainer>
          {comment.length > 0 ? (
            <CommentButton
              style={{ backgroundColor: "#0025A7", color: "white" }}
              onClick={postComment}
            >
              등록
            </CommentButton>
          ) : (
            <CommentButton
              style={{ cursor: "default" }}
              disabled
              onClick={postComment}
            >
              등록
            </CommentButton>
          )}
        </CommentButtonContainer>
      </CommentFormContainer>

      <CommentListContainer>
        {commentList.map((commentArr, commentIndex) => {
          return (
            <CommentListWrapper key={commentIndex}>
              <CommentProfile>프로필</CommentProfile>
              <CommentListNicknameWrapper>
                <CommentListNickname>ss</CommentListNickname>
                <CommentListComment>
                  {commentArray}
                  {commentArr}
                </CommentListComment>
                <CommentListReplyComment onClick={onClick}>
                  답글
                </CommentListReplyComment>

                {/* 대댓글 */}
                {replyValid ? (
                  <CommentFormContainer>
                    <CommentProfile>프로필</CommentProfile>
                    <CommentInput
                      type="text"
                      placeholder="댓글 입력하기.."
                      ref={replyCommentRef}
                      onInput={handleReplyCommentResizeHeight}
                      onChange={(e) => {
                        setReplyComment(e.target.value);
                        console.log(e);
                      }}
                      value={replyComment}
                    />
                    <CommentButtonContainer>
                      {replyComment.length > 0 ? (
                        <CommentButton
                          style={{
                            backgroundColor: "#0025A7",
                            color: "white",
                          }}
                          onClick={postReplyComment}
                        >
                          등록
                        </CommentButton>
                      ) : (
                        <CommentButton
                          style={{ cursor: "default" }}
                          disabled
                          onClick={postReplyComment}
                        >
                          등록
                        </CommentButton>
                      )}
                    </CommentButtonContainer>
                  </CommentFormContainer>
                ) : (
                  <>
                    {replyCommentList.map((replyCommentArr, i) => {
                      return (
                        <CommentFormContainer key={i}>
                          <CommentProfile>프로필</CommentProfile>
                          <CommentInput
                            type="text"
                            placeholder="댓글 입력하기.."
                            ref={replyCommentRef}
                            onInput={handleReplyCommentResizeHeight}
                            onChange={(e) => {
                              setReplyComment(e.target.value);
                            }}
                            value={replyComment}
                          />
                          <CommentButtonContainer>
                            {replyComment.length > 0 ? (
                              <CommentButton
                                style={{
                                  backgroundColor: "#0025A7",
                                  color: "white",
                                }}
                                onClick={postReplyComment}
                              >
                                등록
                              </CommentButton>
                            ) : (
                              <CommentButton
                                style={{ cursor: "default" }}
                                disabled
                                onClick={postReplyComment}
                              >
                                등록
                              </CommentButton>
                            )}
                          </CommentButtonContainer>
                          {replyCommentArr}
                        </CommentFormContainer>
                      );
                    })}
                  </>
                )}
              </CommentListNicknameWrapper>
            </CommentListWrapper>
          );
        })}
      </CommentListContainer>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

const CommentTitleContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.black};
  font-weight: bold;
`;

const CommentFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CommentProfile = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor2};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  color: white;
  margin-right: 20px;
`;
const CommentInput = styled.textarea`
  width: 70%;
  border: none;
  height: 23px;
  background-color: #191818;
  border-radius: 4px;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 10px;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CommentButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.subColor2};
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  width: 40px;
  height: 30px;
  cursor: pointer;
`;

const CommentListContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const CommentListWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const CommentListNicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const CommentListNickname = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
const CommentListComment = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const CommentListReplyComment = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-top: 10px;
  color: #d28e8e;
  cursor: pointer;
`;
