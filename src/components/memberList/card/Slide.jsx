import { useEffect, useRef } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { saveAs } from "file-saver";
import GitHubCalendar from "react-github-calendar";
import {
  cardIdNum,
  github,
  imgSrc,
  instagram,
  introduceText,
  language,
  nickNameText,
  position,
  skillSrc,
  statusMessage,
  tag,
  twitter,
} from "../../../store/cardInfoAtom";
import { useMutation } from "react-query";
import { BsFillBookmarkFill } from "react-icons/bs";
import {
  memberListuseMutationDeleteBookMark,
  memberListuseMutationPostBookMark,
  memberListuseMutationPostCardInfo,
  memberListuseQuerygetBookMarkList,
} from "../../../apis/queries/memberListQuery";
import { getCookieToken } from "../../../cookie/cookie";
import { useQueryMyPageGetUserValid } from "../../../apis/customQuery/myPageCustomQuery";
import { userBookMarkList } from "../../../store/userInfoAtom";
import domtoimage from "dom-to-image";
import {
  follower,
  following,
  githubAccount,
  githubConnection,
  githubProfileImageUrl,
  recentCommitMessage,
} from "../../../store/githubInfoAtom";
import { useNavigate } from "react-router-dom";

const SimpleSlider = ({ setRetouch, retouch }) => {
  const navigate = useNavigate();

  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const loginUri = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo:status read:repo_hook user:email&redirect_uri=http://localhost:3000/githubloginpage`;

  const [loginUserName, setLoginUserName] = useState();
  const [tagText, setTagText] = useState("");
  const [statusMsg, setStatusMsg] = useRecoilState(statusMessage);
  const [field, setField] = useRecoilState(position);
  const [skill, setSkill] = useRecoilState(language);
  const [githubId, setGithubId] = useRecoilState(github);
  const [instagramId, setInstagramId] = useRecoilState(instagram);
  const [twitterId, setTwitterId] = useRecoilState(twitter);
  const [tagList, setTagList] = useRecoilState(tag);
  const [introduce, setIntroduce] = useRecoilState(introduceText);
  const img = useRecoilValue(imgSrc);
  const cardId = useRecoilValue(cardIdNum);
  const skillUrl = useRecoilValue(skillSrc);
  const nickname = useRecoilValue(nickNameText);
  const cardRef = useRef();
  //github 관련 recoil
  const hasGithub = useRecoilValue(githubConnection);
  const lastCommitMsg = useRecoilValue(recentCommitMessage);
  const githubProfileImgUrl = useRecoilValue(githubProfileImageUrl);
  const githubfollower = useRecoilValue(follower);
  const githubfollowing = useRecoilValue(following);
  const githubName = useRecoilValue(githubAccount);

  const { data: getUserInfoValue } = useQueryMyPageGetUserValid();

  //상세정보 수정 정보 보내기
  const { mutate: editCardInfo } = useMutation(
    (editCardListUserInfo) =>
      memberListuseMutationPostCardInfo(editCardListUserInfo, cardId),
    {
      onSuccess: (res) => {
        setRetouch(!retouch);
      },
      onError: (err) => {},
    }
  );

  const [bookMarkList, setBookList] = useRecoilState(userBookMarkList);
  //로그인한 유저에 즐겨찾기 리스트 가져오기 react-query
  const { mutate: bookList } = useMutation(
    "bookMarkList",
    () => memberListuseQuerygetBookMarkList(),
    {
      onSuccess: (res) => {
        setBookList(res);
      },
    }
  );
  //로그인한 유저에 북마크 리스트를 첫렌더링시 실행
  useEffect(() => {
    if (getCookieToken("accessToken")) {
      bookList();
    }
  }, []);
  useEffect(() => {
    setLoginUserName(localStorage.getItem("name"));
  }, []);

  //북마크 클릭시 즐겨찾기에 추가 react-query
  const { mutate: addBookMark } = useMutation(
    "bookMark",
    () => memberListuseMutationPostBookMark(cardId),
    {
      onSuccess: (res) => {
        bookList();
      },
    }
  );
  //북마크 클릭시 즐겨찾기에 해제 react-query
  const { mutate: minusBookMark } = useMutation(
    "minusbookMark",
    () => memberListuseMutationDeleteBookMark(cardId),
    {
      onSuccess: (res) => {
        bookList();
      },
      onError: (err) => {},
    }
  );

  //slick-slide 기본셋팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //onChange
  const introduceOnChange = (text) => {
    setIntroduce(text.target.value);
  };
  const githubOnChange = (text) => {
    setGithubId(text.target.value);
  };
  const instagramOnChange = (text) => {
    setInstagramId(text.target.value);
  };
  const twitterOnChange = (text) => {
    setTwitterId(text.target.value);
  };
  const tagOnChange = (text) => {
    setTagText(text.target.value);
  };

  //onClick
  const reTouchOnClick = () => {
    setRetouch(!retouch);
  };
  //카드 정보 수정 내용을 담은 객체
  const editCardListUserInfo = {
    statusMessage: statusMsg,
    field: field,
    skill: skill,
    introduction: introduce,
    snsSet: [
      { account: githubId, name: "github" },
      { account: instagramId, name: "instagram" },
      { account: twitterId, name: "twitter" },
    ],
    tagSet: tagList,
  };
  //수정완료 버튼 클릭
  const submitBtnOnClick = (e) => {
    editCardInfo(editCardListUserInfo);
    e.preventDefault();
  };
  //태그 삭제 버튼 클릭
  const tagXBtnOnClick = (index) => {
    setTagList((tagList) => [...tagList].filter((value, i) => i !== index));
  };

  const bookMarkOnClick = () => {
    if (getCookieToken("accessToken")) {
      const boolean =
        bookMarkList &&
        bookMarkList.map((data) => data.nickname).includes(nickname);
      if (!boolean) {
        addBookMark();
      } else {
        minusBookMark();
      }
    } else {
      Swal.fire({
        text: "즐겨찾기는 로그인 후 이용해 주세요.",
        showCancelButton: true,
        confirmButtonText: "로그인하기",
        cancelButtonText: "X",
      }).then((res) => {
        if (res.isConfirmed) navigate("/login");
      });
    }
  };

  //onSubmit
  const tagOnSubmit = (e) => {
    e.preventDefault();
    if (tagText.length > 0) {
      setTagList((tagList) => [...tagList, tagText]);
      setTagText("");
    }
  };

  //onChange
  const statusMsgOnChange = (text) => {
    setStatusMsg(text.target.value);
  };
  const positionOnChange = (text) => {
    setField(text.target.value);
  };
  const skillOnChange = (text) => {
    setSkill(text.target.value);
  };

  // cardImage화
  const onDownloadBtn = () => {
    const card = cardRef.current;
    domtoimage
      .toBlob(card)
      .then((blob) => {
        saveAs(blob, "card.png");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  //선택 가능한 포지션 list
  const positionList = [
    "Back-end Developer",
    "Front-end Developer",
    "Software Engineer",
    "Publisher",
    "Android",
    "IOS",
    "Nerwork Engineer",
    "Machine Learning",
    "PM",
    "Data Scientist",
    "QA",
    "Big Data Enineer",
    "Security Engineer",
    "Embebdded",
    "Block Chain",
    "Designer",
    "DBA",
    "VR Engineer",
    "Hardware Engineer",
  ];
  //선택 가능한 사용언어 list
  const skillList = [
    "javaScript",
    "TypeScript",
    "React",
    "Vue",
    "Svelte",
    "Next",
    "Java",
    "Spring",
    "Node.js",
    "Nest.js",
    "Go",
    "Kotlin",
    "Express",
    "MySQL",
    "MongoDB",
    "Python",
    "Django",
    "php",
    "GraphQL",
    "Firebase",
    "Flutter",
    "Swift",
    "ReactNative",
    "Unity",
    "AWS",
    "Kubernetes",
    "Docker",
    "Git",
    "Figma",
    "Zeplin",
    "Jest",
  ];

  return (
    <StyledSlider {...settings} retouch={retouch}>
      <div>
        <First>
          <StatusWrapper>
            <BookMark
              onClick={() => bookMarkOnClick()}
              nickName={
                bookMarkList &&
                bookMarkList.map((data) => data.nickname).includes(nickname)
                  ? true
                  : undefined
              }
            >
              <BsFillBookmarkFill />
            </BookMark>
            {retouch ? (
              <StatusMessageWrapper>
                <StatusMessage
                  value={statusMsg || ""}
                  onChange={(text) => statusMsgOnChange(text)}
                  retouch={retouch}
                  maxLength="15"
                />
              </StatusMessageWrapper>
            ) : (
              <StatusMessageWrapper>
                <StatusMessage value={statusMsg || ""} disabled />
              </StatusMessageWrapper>
            )}
            <FiledTextWrapper>
              <FiledText>{field}</FiledText>
            </FiledTextWrapper>
            <LanguageImgWrapper>
              <LanguageImg retouch={retouch}>
                {retouch ? (
                  <>
                    <select
                      value={field || ""}
                      onChange={(text) => positionOnChange(text)}
                      placeholder="포지션을 선택"
                    >
                      {positionList.map((name) => (
                        <option key={name}>{name}</option>
                      ))}
                      <option>react</option>
                    </select>

                    <select
                      value={skill || ""}
                      onChange={(text) => skillOnChange(text)}
                    >
                      {skillList.map((name) => (
                        <option key={name}>{name}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <img src={skillUrl} alt="사용언어" />
                  </>
                )}
              </LanguageImg>
            </LanguageImgWrapper>
          </StatusWrapper>
          <ProfileImg>
            {getUserInfoValue?.nickname === nickname ? (
              <AiFillSetting onClick={() => reTouchOnClick()} />
            ) : null}
            <img src={img} alt="d" />
          </ProfileImg>
          <Name value={nickname || ""} disabled />
          <SnsList>
            {retouch ? (
              <>
                <SnsItem>
                  <span>Github</span>
                  <SnsAdressInput
                    value={githubId || ""}
                    onChange={(text) => githubOnChange(text)}
                    placeholder="깃헙 name을 입력해주세요"
                  />
                </SnsItem>
                <SnsItem>
                  <span>Instagram</span>
                  <SnsAdressInput
                    value={instagramId || ""}
                    onChange={(text) => instagramOnChange(text)}
                    placeholder="Instagram @XXX를 입력해주세요"
                  />
                </SnsItem>
                <SnsItem>
                  <span>Twitter</span>
                  <SnsAdressInput
                    value={twitterId || ""}
                    onChange={(text) => twitterOnChange(text)}
                    placeholder="트위터 @XXX를 입력해주세요"
                  />
                </SnsItem>
              </>
            ) : (
              <>
                <SnsItem github="github">
                  <a href={`https://github.com/${githubId}`}>
                    <BsGithub />
                  </a>
                </SnsItem>
                <SnsItem instagram="instagram">
                  <a href={`https://www.instagram.com/${instagramId}`}>
                    <BsInstagram />
                  </a>
                </SnsItem>
                <SnsItem twitter="twitter">
                  <a href={`https://twitter.com/${twitterId}`}>
                    <BsTwitter />
                  </a>
                </SnsItem>
              </>
            )}
          </SnsList>
          {retouch ? (
            <Introduce
              value={introduce || ""}
              onChange={(text) => introduceOnChange(text)}
              retouch={retouch}
            />
          ) : (
            <Introduce value={introduce || ""} disabled />
          )}
          <TagList>
            {tagList &&
              tagList.map((tag, index) => (
                <TagItem key={tag}>
                  #{tag}
                  {retouch ? (
                    <TagXBtn onClick={() => tagXBtnOnClick(index)}>X</TagXBtn>
                  ) : null}
                </TagItem>
              ))}
          </TagList>
          {retouch ? (
            <>
              <TagInputDiv onSubmit={(e) => tagOnSubmit(e)} retouch={retouch}>
                <span>태그 추가하기</span>
                <TagInput
                  value={tagText || ""}
                  onChange={(text) => tagOnChange(text)}
                />
                <SubmitBtnWrapper>
                  <SubmitBtn type="button" onClick={(e) => submitBtnOnClick(e)}>
                    완료
                  </SubmitBtn>
                </SubmitBtnWrapper>
              </TagInputDiv>
            </>
          ) : null}
        </First>
      </div>
      {hasGithub === false && nickname === loginUserName ? (
        <div>
          <Second>
            <GithubConnectionBtn href={loginUri}>
              Github 연동
            </GithubConnectionBtn>
          </Second>
        </div>
      ) : hasGithub ? (
        <div>
          <Second hasGithub={true}>
            <GithubDiv>
              <GithubLastCommitMsg
                value={"마지막 커밋: " + lastCommitMsg}
                disabled
              ></GithubLastCommitMsg>
              <GithubProfileImg>
                <img src={githubProfileImgUrl} alt="github profile img" />
              </GithubProfileImg>
              <GithubName>{githubName}</GithubName>
              <FollowerFollowingDiv>
                <Follower>
                  <p>Followers</p>
                  <span>{githubfollower}</span>
                </Follower>
                <Following>
                  <p>Following</p>
                  <span>{githubfollowing}</span>
                </Following>
              </FollowerFollowingDiv>
              <GitHubCalendar
                username={githubName}
                style={{ width: "80%" }}
                year="2023"
              />
            </GithubDiv>
          </Second>
        </div>
      ) : null}
      <div className="slick-slide">
        <Third>
          <ThirdUploadWrapper>
            <ThirdUploadFile type="file" className="fileUploadInput" />
            <CardImageButtonWrapper>
              <UploadImageButton className="fileUploadButton">
                카드이미지 업로드
              </UploadImageButton>
            </CardImageButtonWrapper>
          </ThirdUploadWrapper>
          <ThirdWrapper>
            <CardWrapper>
              <Card ref={cardRef} className="card">
                <Skill>
                  <img src={skillUrl} alt="34" />
                </Skill>
                <ThirdProfileImg>
                  <img src={img} alt="앗 안나와여" />
                </ThirdProfileImg>
                <Nickname>{nickname}</Nickname>
                <Role>{field}</Role>
              </Card>

              <CardImageButtonWrapper>
                <CardImageButton onClick={onDownloadBtn}>
                  이미지 다운로드
                </CardImageButton>
              </CardImageButtonWrapper>
            </CardWrapper>
          </ThirdWrapper>
        </Third>
      </div>
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  /* height: 100%; */
  margin-top: 10px;
  transition: all 1s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .slick-slide {
    height: 100%;
    width: 100%;
  }
  h3 {
    text-align: center;
  }
  .slick-prev {
    z-index: 5;
    left: 0;
    &::before {
      font-size: 40px;
    }
  }
  .slick-next {
    z-index: 5;
    left: calc(100% - 40px);
    &::before {
      font-size: 40px;
    }
  }
  .slick-dots {
    li {
      ${(props) =>
        props.retouch
          ? css`
              display: none;
            `
          : css``}
      button {
        &::before {
          font-size: 15px;
          color: white;
        }
      }
    }
  }
`;

const First = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const StatusWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BookMark = styled.div`
  flex: 2;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 38px;
  svg {
    cursor: pointer;
  }
  ${(props) =>
    props.nickName
      ? css`
          color: #ececec;
        `
      : css`
          color: #494949;
        `}
`;
const StatusMessageWrapper = styled.div`
  flex: 4;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatusMessage = styled.input`
  padding: 5px;
  width: 60%;
  height: 31px;
  background-color: #262626;
  border-radius: 9999px;
  text-align: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  ${(props) =>
    props.retouch
      ? css`
          outline: 1px solid;
        `
      : css``}
`;
const LanguageImgWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const LanguageImg = styled.div`
  ${(props) =>
    props.retouch
      ? css`
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 40px;
          right: 10px;
        `
      : css`
          display: flex;
          justify-content: center;
        `}
  select {
    height: 30px;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.white};
    option {
      color: ${({ theme }) => theme.colors.black};
    }
  }
  h4 {
    margin: 0;
  }
  img {
    width: 40px;
    height: 40px;
  }
`;

const FiledTextWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20%;
`;
const FiledText = styled.h4`
  width: 100%;
  text-align: center;
  margin: 0;
`;
const ProfileImg = styled.div`
  position: relative;
  margin-top: 30px;
  svg {
    position: absolute;
    top: 70%;
    left: 75%;
    font-size: ${({ theme }) => theme.fontSizes.titleSize};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.subColor1};
    }
  }
  img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
  }
`;
const Name = styled.input`
  margin: 20px 0 0 0;
  width: 80%;
  background-color: transparent;
  border-radius: 10px;
  outline: none;
  border: none;
  text-align: center;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.white};
`;
const SnsList = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  width: 100%;
  list-style: none;
`;
const SnsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  font-size: ${({ theme }) => theme.fontSizes.name};
  cursor: pointer;
  span {
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  a {
    color: ${({ theme }) => theme.colors.white};
    svg {
      &:hover {
        color: ${({ theme }) => theme.colors.subColor1};
      }
    }
  }
`;
const SnsAdressInput = styled.input`
  outline: 1px solid;
  padding: 5px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  background-color: #262626;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.white};
  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;
const Introduce = styled.textarea`
  margin-top: 30px;
  padding: 10px;
  width: 80%;
  height: 100%;
  background-color: transparent;
  resize: none;
  border: none;
  text-align: center;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.white};
  ${(props) =>
    props.retouch
      ? css`
          background-color: #262626;
          outline: 1px solid;
          border-radius: 10px;
          color: ${({ theme }) => theme.colors.white};
        `
      : css`
          resize: none;
        `}
`;
const TagList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  width: 90%;
`;
const TagItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 0 10px;
  height: 30px;
  background-color: black;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const TagXBtn = styled.div`
  position: absolute;
  top: -7.5px;
  right: -7.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: gray;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor2};
  }
`;
const TagInputDiv = styled.form`
  display: flex;
  align-items: center;
  width: 90%;
  span {
    margin-right: 15px;
  }
`;
const TagInput = styled.input`
  padding: 5px;
  background-color: #262626;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  outline: 1px solid white;
`;
const SubmitBtnWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const SubmitBtn = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor6};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.5s;
  }
`;

const Second = styled.div`
  display: flex;
  ${(props) =>
    props.hasGithub
      ? null
      : css`
          align-items: center;
        `}
  justify-content: center;
  height: 49vh;
`;
const GithubConnectionBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.green_1};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  &:hover {
    box-shadow: inset 10px 10px 5px -5px rgba(0, 0, 0, 0.36),
      inset -8px -11px 5px -5px rgba(0, 0, 0, 0.36);
  }
`;
const GithubDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const GithubLastCommitMsg = styled(StatusMessage)`
  width: 50%;
`;
const GithubProfileImg = styled(ProfileImg)`
  margin: 25px 0 5px 0;
`;
const GithubName = styled.h1`
  margin-bottom: 10px;
`;
const FollowerFollowingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 15px 0 35px 0;
  width: 60%;
`;
const Follower = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: bold;
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;
const Following = styled(Follower)``;

const Third = styled(First)`
  width: 100%;
  height: 100%;
`;
const ThirdUploadWrapper = styled.div`
  width: 100%;
  padding-left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  .fileUploadInput {
    margin-right: 40px;
  }
  .fileUploadButton {
  }
`;
const ThirdUploadFile = styled.input`
  border: none;
  width: 55%;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.white};
  padding: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-radius: 10px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.subColor4};
  }
`;
const ThirdWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  margin-top: -30px;
`;
const Card = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  color: black;
  background: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Skill = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 28px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ThirdProfileImg = styled.div`
  margin: 55px 0 10px 0;
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;
const Nickname = styled.h2`
  margin: -5px 0 0 0;
`;
const Role = styled.h5`
  margin: 0;
  color: #505050;
`;

const CardImageButtonWrapper = styled.div`
  width: 100%;
`;
const CardImageButton = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  bottom: 60px;
  right: 60px;
  border: 2px solid white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor6};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.5s;
  }
`;

const UploadImageButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  bottom: 60px;
  right: 60px;
  border: 2px solid white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor6};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.5s;
  }
`;
export default SimpleSlider;
