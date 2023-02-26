import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
import { useQueryMyPageGetUserValid } from "../../../apis/customQuery/myPageCustomQuery";
import {
  commentUseMutationDeleteCommentList,
  commentUseMutationPostCommentList,
  commentUseQueryGetCommentList,
  replyCommentUseMutationDeleteCommentList,
  replyCommentUseMutationPostCommentList,
} from "../../../apis/queries/commentQuery";
import { getCookieToken } from "../../../cookie/cookie";
import { cardIdNum } from "../../../store/cardInfoAtom";

export default function CommentList() {
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState([]);
  const [replyValid, setReplyValid] = useState(false);
  const cardId = useRecoilValue(cardIdNum);
  const commentRef = useRef(null);
  const replyCommentRef = useRef(null);
  const queryClient = useQueryClient();

  const token = getCookieToken("accessToken");
  const { data: getUserInfoValue } = useQueryMyPageGetUserValid();

  const { data: commentCardInfo } = useQuery(
    ["cardCommentInfo", cardId],
    commentUseQueryGetCommentList,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (res) => {},
      onError: (err) => {},
    }
  );

  // 댓글 보내기
  const { mutate: postCommentList } = useMutation(
    (postCommentInfo) => commentUseMutationPostCommentList(postCommentInfo),
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

  // 댓글 삭제
  const { mutate: commentDelete } = useMutation(
    (deleteCommentInfo) =>
      commentUseMutationDeleteCommentList(deleteCommentInfo),
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

  // 대댓글 기능
  const { mutate: postReplyCommentList } = useMutation(
    (postReplyCommentInfo) =>
      replyCommentUseMutationPostCommentList(postReplyCommentInfo),
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

  // 대댓글 삭제
  const { mutate: replyCommentDelete } = useMutation(
    (deleteReplyCommentInfo) =>
      replyCommentUseMutationDeleteCommentList(deleteReplyCommentInfo),
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

  // 댓글 보내기 온클릭
  const onClickPostComment = (e) => {
    const postCommentInfo = { cardId, comment };
    if (comment.trim() === "") {
      e.preventDefault();
      Swal.fire({
        text: "내용을 입력해주세요",
      });
      return;
    }
    postCommentList(postCommentInfo);
    setComment("");
  };

  const enterPostComment = (e) => {
    const postCommentInfo = { cardId, comment };
    if (e.nativeEvent.isComposing) {
      return; // 조합 중이므로 동작을 막는다.
    }
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      if (comment.trim() === "") {
        Swal.fire({
          text: "내용을 입력해주세요",
        });
        e.preventDefault();
        return;
      }
      commentRef.current.blur();
      postCommentList(postCommentInfo);
      setComment("");
    } else {
      return;
    }
  };

  // 댓글 삭제 온클릭
  const onClickDeleteComment = (commentId) => {
    const deleteCommentInfo = { cardId, commentId };
    Swal.fire({
      padding: "3em",
      title: "댓글을 삭제하시겠습니까?",
      confirmButtonText: "확인",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then((data) => {
      if (data.isConfirmed) commentDelete(deleteCommentInfo);
    });
  };

  const onClickReplyComment = (commentIndex) => {
    setReplyValid(!replyValid);
    setReplyCommentId(commentIndex);
    setReplyComment("");
  };

  // 대댓글  온클릭
  const onClickPostReplyComment = (commentId, e) => {
    const postReplyCommentInfo = { cardId, commentId, replyComment };
    if (comment.trim() === "") {
      e.preventDefault();
      Swal.fire({
        text: "내용을 입력해주세요",
      });
      return;
    }
    postReplyCommentList(postReplyCommentInfo);
    setReplyComment("");
  };

  const enterPostReplyComment = (e, commentId) => {
    const postReplyCommentInfo = { cardId, commentId, replyComment };
    if (e.nativeEvent.isComposing) {
      return; // 조합 중이므로 동작을 막는다.
    }
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      if (replyComment.trim() === "") {
        Swal.fire({
          text: "내용을 입력해주세요",
        });
        e.preventDefault();
        return;
      }
      postReplyCommentList(postReplyCommentInfo);
      setReplyComment("");
    } else {
      return;
    }
  };

  // 대댓글 삭제 온클릭
  const onClickDeleteReplyComment = (commentId, replyId) => {
    const deleteReplyCommentInfo = { cardId, commentId, replyId };
    console.log(deleteReplyCommentInfo);
    replyCommentDelete(deleteReplyCommentInfo);
  };

  const onChangeCommentValue = (e) => {
    setComment(e.target.value);
  };
  const handleCommentResizeHeight = () => {
    commentRef.current.style.height = "auto";
    commentRef.current.style.padding = "10px";
  };

  const handleReplyCommentResizeHeight = () => {
    replyCommentRef.current.style.height = "23px";
    replyCommentRef.current.style.padding = "10px";
  };

  const onChangeRelyValue = (e) => {
    setReplyComment(e.target.value);
  };

  return (
    <CommentContainer>
      {/* <CommentTitleContainer>
        <CommentTitle>댓글</CommentTitle>
      </CommentTitleContainer> */}

      <CommentFormContainer>
        {token && (
          <>
            <CommentProfile
              alt="image"
              src={`${getUserInfoValue?.profileImage}`}
            />
            <CommentInput
              placeholder="댓글"
              ref={commentRef}
              onInput={handleCommentResizeHeight}
              rows={1}
              onChange={onChangeCommentValue}
              onKeyDown={(e) => enterPostComment(e)}
              value={comment || ""}
            />
            <CommentButtonContainer>
              {comment.length > 0 ? (
                <CommentButton
                  style={{ backgroundColor: "#0025A7", color: "white" }}
                  onClick={onClickPostComment}
                >
                  등록
                </CommentButton>
              ) : (
                <CommentButton
                  style={{ cursor: "default" }}
                  disabled
                  onClick={onClickPostComment}
                >
                  등록
                </CommentButton>
              )}
            </CommentButtonContainer>
          </>
        )}
      </CommentFormContainer>
      <CommentListContainer>
        {commentCardInfo?.map((commentArr, commentIndex) => {
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
                  {token && (
                    <CommentListReplayTitle
                      onClick={() => onClickReplyComment(commentIndex)}
                    >
                      답글
                    </CommentListReplayTitle>
                  )}

                  {getUserInfoValue?.nickname === commentArr.nickname && (
                    <CommentListReplayTitle
                      onClick={() => onClickDeleteComment(commentArr.commentId)}
                    >
                      삭제
                    </CommentListReplayTitle>
                  )}

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
                                {getUserInfoValue?.nickname ===
                                  replyCommentList.nickname && (
                                  <CommentListReplayTitle
                                    onClick={() =>
                                      onClickDeleteReplyComment(
                                        replyCommentList.commentId,
                                        replyCommentList.replyId
                                      )
                                    }
                                  >
                                    삭제
                                  </CommentListReplayTitle>
                                )}
                              </CommentListReplyCommentInnderWrapper>
                            </CommentListWrapper>
                          );
                        })}
                        <CommentListWrapper className="replyCommentListWrapper">
                          <CommentProfile
                            alt="image"
                            src={`${getUserInfoValue?.profileImage}`}
                          />
                          <CommentListReplyCommentInnderWrapper className="replyCommentInputContainer">
                            <CommentInput
                              type="text"
                              placeholder="답글"
                              ref={replyCommentRef}
                              onInput={handleReplyCommentResizeHeight}
                              rows={1}
                              onChange={onChangeRelyValue}
                              onKeyDown={(e) =>
                                enterPostReplyComment(e, commentArr.commentId)
                              }
                              value={replyComment || ""}
                            />
                            <CommentButtonContainer>
                              {replyComment.length > 0 ? (
                                <CommentButton
                                  style={{
                                    backgroundColor: "#0025A7",
                                    color: "white",
                                  }}
                                  onClick={() =>
                                    onClickPostReplyComment(
                                      commentArr.commentId
                                    )
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
  margin: 15px 0;
`;

const CommentTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
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
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  /* margin-right: 20px; */
`;
const CommentInput = styled.textarea`
  width: 70%;
  border: none;
  /* height: 23px; */
  background-color: transparent;
  border-radius: 4px;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor3};
  &:focus {
    outline: none;
    border-bottom: 1px solid white;
  }
`;
const CommentButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CommentButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
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
  padding: 5px;

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
  margin-right: 5px;
`;
const CommentListReplyCommentWrapper = styled.div`
  margin-top: 5px;
  ${(props) =>
    props.replyComment === "true"
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

const CommentListReplyCommentInnderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  /* position: absolute; */
`;
