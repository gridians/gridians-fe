import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { useQueryMyPageGetUserValid } from "../../apis/customQuery/myPageCustomQuery";
import {
  commentUseMutationDeleteCommentList,
  commentUseMutationPostCommentList,
  commentUseQueryGetCommentList,
  replyCommentUseMutationPostCommentList,
} from "../../apis/queries/commentQuery";
import { getCookieToken } from "../../cookie/cookie";
import { loginUserNickname } from "../../store/userInfoAtom";

export default function CommentList() {
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState([]);
  // const [replyCommentList, setReplyCommentList] = useState([]);
  const [replyValid, setReplyValid] = useState(false);
  const textRef = useRef();
  const replyCommentRef = useRef(null);
  const queryClient = useQueryClient();
  const [commentNickname, setCommentNickname] = useState("");

  // const commentNickname = useRecoilValue(loginUserNickname);
  // console.log(commentNickname);

  const { mutate: getUserInfoValue } = useQueryMyPageGetUserValid();

  useEffect(() => {
    if (getCookieToken("accessToken") === undefined) {
      console.log("token 없어");
      return;
    } else {
      getUserInfoValue();
      postCommentList();
    }
  }, []);

  const { data: CommentCardInfo, isLoading: CommentCardInfoLoading } = useQuery(
    "carCommentInfo",
    commentUseQueryGetCommentList,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const { mutate: postCommentList } = useMutation(
    (comment) => commentUseMutationPostCommentList(comment),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (res) => {
        console.log(res);
      },
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries();
      },
    }
  );

  const { mutate: commentDelete } = useMutation(
    (commentId) => commentUseMutationDeleteCommentList(commentId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log(res);
        // queryClient.invalidateQueries("carCommentInfo");
      },
      onSettled: (data, error, variables, context) => {
        // console.log(data);
        queryClient.invalidateQueries();
      },
    }
  );

  const { mutate: replyCommentList } = useMutation(
    (commentId) =>
      replyCommentUseMutationPostCommentList(commentId, replyComment),
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log(res);
        setReplyComment("");
      },
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries();
      },
    }
  );
  const postComment = () => {
    postCommentList(comment);
    setComment("");
  };

  const onClickdeleteComment = (commentId) => {
    commentDelete(commentId);
  };

  const postReplyComment = (commentId) => {
    replyCommentList(commentId, replyComment);
    // setReplyComment("");
  };

  const onClickReplyComment = (commentIndex) => {
    setReplyValid(!replyValid);
    setReplyCommentId(commentIndex);
    setReplyComment("");
  };

  const handleResizeHeight = useCallback(() => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = "23px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const handleReplyCommentResizeHeight = useCallback(() => {
    if (replyCommentRef === null || replyCommentRef.current === null) {
      return;
    }
    replyCommentRef.current.style.height = "23px";
    replyCommentRef.current.style.height =
      replyCommentRef.current.scrollHeight + "px";
    replyCommentRef.current.disabled = false;
    replyCommentRef.current.focus();
  }, []);

  const onChangeRelyValue = (e) => {
    setReplyComment(e.target.value);
  };

  return (
    <CommentContainer>
      <CommentTitleContainer>
        <CommentTitle>댓글</CommentTitle>
      </CommentTitleContainer>

      <CommentFormContainer>
        <CommentProfile />
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
        {CommentCardInfo?.map((commentArr, commentIndex) => {
          return (
            <CommentListWrapper key={commentIndex}>
              <CommentProfile alt="image" src={`${commentArr.profileImage}`} />
              <CommentListCommentWrapper>
                <CommentListNickname>
                  {commentArr.nickname}
                  <CommentDate>{commentArr.createdAt}</CommentDate>
                </CommentListNickname>
                <CommentListComment className="replyComment">
                  {commentArr.contents}
                </CommentListComment>
                <CommentListReplyComment>
                  <CommentListReplayTitle
                    onClick={() => onClickReplyComment(commentIndex)}
                  >
                    답글
                  </CommentListReplayTitle>
                  <CommentListReplayTitle
                    onClick={() => onClickdeleteComment(commentArr.commentId)}
                  >
                    삭제
                  </CommentListReplayTitle>
                  {/* {getUserInfoValue?.nickname === commentArr.nickname && ( */}
                  {/* )} */}

                  {replyValid && (
                    <>
                      <CommentListReplyCommentWrapper
                        replyComment={
                          replyCommentId === commentIndex ? "true" : "false"
                        }
                      >
                        {commentArr.replyList.map((replyCommentList, index) => {
                          return (
                            <CommentListWrapper
                              key={index}
                              className="replyCommentListWrapper"
                            >
                              {console.log(replyCommentList)}
                              <CommentProfile
                                alt="image"
                                src={`${replyCommentList.imageSrc}`}
                              />
                              <CommentListReplyCommentInnderWrapper className="replyCommentList">
                                <CommentListNickname>
                                  {replyCommentList.nickname}
                                  <CommentDate>
                                    {replyCommentList.createdAt}
                                  </CommentDate>
                                </CommentListNickname>
                                <CommentListComment>
                                  {replyCommentList.contents}
                                </CommentListComment>
                              </CommentListReplyCommentInnderWrapper>
                            </CommentListWrapper>
                          );
                        })}
                        <CommentListWrapper className="replyCommentListWrapper">
                          <CommentProfile />
                          <CommentListReplyCommentInnderWrapper className="replyCommentInputContainer">
                            <CommentInput
                              type="text"
                              placeholder="댓글 입력하기.."
                              ref={replyCommentRef}
                              onInput={handleReplyCommentResizeHeight}
                              onChange={onChangeRelyValue}
                              value={replyComment}
                            />
                            <CommentButtonContainer>
                              {replyComment.length > 0 ? (
                                <CommentButton
                                  style={{
                                    backgroundColor: "#0025A7",
                                    color: "white",
                                  }}
                                  onClick={() =>
                                    postReplyComment(commentArr.commentId)
                                  }
                                >
                                  등록
                                </CommentButton>
                              ) : (
                                <CommentButton
                                  style={{ cursor: "default" }}
                                  disabled
                                >
                                  등록
                                </CommentButton>
                              )}
                            </CommentButtonContainer>
                          </CommentListReplyCommentInnderWrapper>
                        </CommentListWrapper>
                      </CommentListReplyCommentWrapper>
                    </>
                  )}
                </CommentListReplyComment>
                {/* {replyValid ? (
             null
                ) : (
                  <>
                    {replyCommentList.map((replyCommentArr, i) => {
                      return (
                        <CommentFormContainer key={i}>
                          <CommentProfile/>
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
const CommentProfile = styled.img`
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
  overflow: hidden;
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
  border: 2px solid white;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #eee;
    border-radius: 10px;
  }
  .replyCommentListWrapper {
    justify-content: space-between;
    .replyCommentList {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }
  }
  .replyCommentInputContainer {
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
  width: 80%;
  display: flex;
  align-items: center;
`;
const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 100;
  padding-left: 10px;
`;
const CommentListComment = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  width: 100%;
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
  ${(props) =>
    props.replyComment === "true"
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
  border: 2px solid white;

  /* position: absolute; */
`;

const CommentListReplyCommentInnderWrapper = styled.div`
  border: 2px solid red;
  display: flex;
  align-items: center;
  width: 70%;
  /* position: absolute; */
`;
