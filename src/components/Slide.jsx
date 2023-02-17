import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  github,
  imgSrc,
  instagram,
  introduceText,
  language,
  nickNameText,
  position,
  statusMessage,
  tag,
  twitter,
} from "../store/cardInfoAtom";
import { useMutation } from "react-query";
import { memberListuseMutationPostCardInfo } from "../apis/queries/memberListQuery";
import { loginUserNickname } from "../store/userInfoAtom";

const SimpleSlider = ({ setRetouch, retouch }) => {
  const [tagText, setTagText] = useState("");
  const [statusMsg, setStatusMsg] = useRecoilState(statusMessage);
  const [field, setField] = useRecoilState(position);
  const [skill, setSkill] = useRecoilState(language);
  const [githubId, setGithubId] = useRecoilState(github);
  const [instagramId, setInstagramId] = useRecoilState(instagram);
  const [twitterId, setTwitterId] = useRecoilState(twitter);
  const [tagList, setTagList] = useRecoilState(tag);
  const [introduce, setIntroduce] = useRecoilState(introduceText);
  const [img, setImg] = useRecoilState(imgSrc);
  const [nickName, setNickName] = useRecoilState(nickNameText);
  const [userName,setUserName] = useRecoilState(loginUserNickname);

  //상세정보 수정 정보 보내기
  const { mutate: cardInfo, isLoading: cardInfoLoading } = useMutation(
    (editCardListUserInfo) =>
      memberListuseMutationPostCardInfo(editCardListUserInfo),
    {
      onSuccess: (res) => {
        console.log("ok");
      },
      onError: (err) => {
        console.log(err);
      },
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
      { id: githubId, name: "github" },
      { id: instagramId, name: "instagram" },
      { id: twitterId, name: "twitter" },
    ],
    tagSet: tagList,
  };
  //수정완료 버튼 클릭
  const submitBtnOnClick = (e) => {
    cardInfo(editCardListUserInfo);
    e.preventDefault();
    /*axios.post(`http://175.215.143.189:8080/cards/3`, {
      statusMessage: statusMsg,
      field: field,
      skillSet: ["Git"],
      introduction:introduce,
      snsSet: [
        { id: githubId, name: "github" },
        { id: instagramId, name: "instagram" },
        { id: twitterId, name: "twitter" },
      ],
      tagSet: tagList,
    });*/
  };
  //태그 삭제 버튼 클릭
  const tagXBtnOnClick = (index) => {
    setTagList((tagList) => [...tagList].filter((value, i) => i !== index));
  };

  //onSubmit
  const tagOnSubmit = (e) => {
    e.preventDefault();
    if (tagText.length > 0) {
      setTagList((tagList) => [...tagList, tagText]);
      setTagText("");
    }
  };

  return (
    <StyledSlider {...settings} retouch={retouch}>
      <div>
        <First>
          <ProfileImg>
            {userName===nickName?<AiFillSetting onClick={() => reTouchOnClick()} />:null}
            <img src={img} alt="d" />
          </ProfileImg>
          <Name value={nickName} disabled />
          <SnsList>
            {retouch ? (
              <>
                <SnsItem>
                  <span>Github</span>
                  <SnsAdressInput
                    value={githubId}
                    onChange={(text) => githubOnChange(text)}
                    placeholder="깃헙 name을 입력해주세요"
                  />
                </SnsItem>
                <SnsItem>
                  <span>Instagram</span>
                  <SnsAdressInput
                    value={instagramId}
                    onChange={(text) => instagramOnChange(text)}
                    placeholder="Instagram @XXX를 입력해주세요"
                  />
                </SnsItem>
                <SnsItem>
                  <span>Twitter</span>
                  <SnsAdressInput
                    value={twitterId}
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
              value={introduce}
              onChange={(text) => introduceOnChange(text)}
              retouch={retouch}
            />
          ) : (
            <Introduce value={introduce} disabled />
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
                  value={tagText}
                  onChange={(text) => tagOnChange(text)}
                />
              </TagInputDiv>
              <SubmitBtn type="button" onClick={(e) => submitBtnOnClick(e)}>
                완료
              </SubmitBtn>
            </>
          ) : null}
        </First>
      </div>
      <div>
        <h1>2</h1>
      </div>
      <div>
        <Third>
          <UserIcon>
            <FaUser />
          </UserIcon>
        </Third>
      </div>
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  height: 90%;
  transition: all 1s;
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
`;
const ProfileImg = styled.div`
  position: relative;
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
  height: 200px;
  background-color: transparent;
  resize: none;
  border: none;
  text-align: center;
  font-size: 32px;
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
const SubmitBtn = styled.button`
  margin-bottom: 20px;
  width: 100px;
  height: 30px;
  outline: none;
  cursor: pointer;
`;

const Second = styled(First)``;
const Third = styled(First)``;
const UserIcon = styled(ProfileImg)`
  font-size: 50px;
`;

export default SimpleSlider;
