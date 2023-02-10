import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { commentuseMutationPostCommentList } from "../../apis/queries/commentQuery";
import { memberListUseQueryGetCardInfo } from "../../apis/queries/memberListQuery";
import { commentAtom } from "../../store/commentAtom";

export default function CommentList() {
  const [comment, setComment] = useRecoilState(commentAtom);
  const [replyComment, setReplyComment] = useState("");
  const [targetId, setTargetId] = useState("");
  const [replyCommentList, setReplyCommentList] = useState([]);
  const [replyValid, setReplyValid] = useState(false);
  const textRef = useRef();
  const textReplyRef = useRef();
  const replyCommentRef = useRef();
  const queryClient = useQueryClient();

  const { data: cardInfo, isLoading: cardInfoLoading } = useQuery(
    "carCommentInfo",
    memberListUseQueryGetCardInfo,
    {
      onSuccess: (res) => {
        // console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const { mutate: commentList } = useMutation(
    (comment) => commentuseMutationPostCommentList(comment),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onSettled: (data, error, variables, context) => {
        // console.log(data);
        // mutation이 완료되면 성공 유무와 관계없이 쿼리를 무효화 시키고 새로 갱신
        queryClient.invalidateQueries("carCommentInfo");
      },
    }
  );
  const postComment = () => {
    // const newCommentList = [...commentList];
    // newCommentList.push(comment);
    // commentList("ss");
    commentList(comment);
    setComment("");
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

  const onClickReplyComment = (commentIndex) => {
    setReplyValid(!replyValid);
    setTargetId(commentIndex);
    console.log(commentIndex);
  };

  const handleResizeHeight = useCallback(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = "23px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const handleReplyCommentResizeHeight = useCallback(() => {
    if (textReplyRef === null || textReplyRef.current === null) {
      return;
    }
    textReplyRef.current.style.height = "23px";
    textReplyRef.current.style.height =
      textReplyRef.current.scrollHeight + "px";
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
        {cardInfo?.commentList.map((commentArr, commentIndex) => {
          return (
            <CommentListWrapper key={commentIndex}>
              <CommentProfile>프로필</CommentProfile>
              <CommentListCommentWrapper>
                <CommentListNickname>{commentArr.nickname}</CommentListNickname>
                <CommentListComment>{commentArr.contents}</CommentListComment>
                <CommentListReplyComment>
                  <CommentListReplayTitle
                    onClick={(event) => onClickReplyComment(commentIndex)}
                  >
                    답글
                  </CommentListReplayTitle>
                  {replyValid ? (
                    <>
                      {commentArr.commentId === targetId + 1 && (
                        <CommentListReplyCommentWrapper>
                          <CommentListReplyCommentInnderWrapper>
                            <CommentProfile>프로필</CommentProfile>
                            <CommentInput
                              type="text"
                              placeholder="댓글 입력하기.."
                              ref={textReplyRef}
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
                          </CommentListReplyCommentInnderWrapper>
                        </CommentListReplyCommentWrapper>
                      )}
                    </>
                  ) : null}
                </CommentListReplyComment>
                {/* {replyValid ? (
             null
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
                )} */}
              </CommentListCommentWrapper>
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
  padding: 10px;
`;

const CommentTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #191818;
  border-radius: 9999px;
  padding: 5px 0;
  margin: 20px 0;
`;

const CommentTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`;

const CommentFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 15px;
`;
const CommentProfile = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.subColor2};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  /* margin-right: 20px; */
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
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;
const CommentButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  width: 40px;
  height: 30px;
  cursor: pointer;
`;

const CommentListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eee;
    border-radius: 10px;
  }
`;
const CommentListWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;
const CommentListCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  /* padding-left: 40px; */
`;
const CommentListNickname = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
const CommentListComment = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  width: 80%;
  margin-top: 10px;
  border: 1px solid white;
  overflow-wrap: break-word;
`;
const CommentListReplyComment = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  position: relative;
`;
const CommentListReplayTitle = styled.span`
  cursor: pointer;
  color: #d28e8e;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const CommentListReplyCommentWrapper = styled.div`
  border: 2px solid white;

  /* position: absolute; */
`;
const CommentListReplyCommentInnderWrapper = styled.div`
  border: 2px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* position: absolute; */
`;
