import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import { BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

const StyledSlider = styled(Slider)`
  height: 75%;
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
      button {
        &::before {
          font-size: 15px;
          color: white;
        }
      }
    }
  }
`;

const SimpleSlider = ({ setRetouch, retouch }) => {
  const [introduce, setIntroduce] = useState(
    "I've developed Web application since 2022"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const introduceOnClick = (text) => {
    setIntroduce(text.target.value);
  };

  const reTouchOnClick = () => {
    setRetouch(!retouch);
  };

  return (
    <StyledSlider {...settings}>
      <div>
        <First>
          <ProfileImg>
            <AiFillSetting onClick={() => reTouchOnClick()} />
            <img src="https://i.ytimg.com/vi/jjqTY0PUoLs/maxresdefault.jpg" />
          </ProfileImg>
          <Name value="jay" disabled />
          <SnsList>
            {retouch ? (
              <>
                <SnsItem>
                  <span>Github</span>
                  <SnsAdressInput placeholder="깃헙 name을 입력해주세요" />
                </SnsItem>
                <SnsItem>
                  <span>Instagram</span>
                  <SnsAdressInput placeholder="인스타 @XXXXX를 입력해주세요" />
                </SnsItem>
                <SnsItem>
                  <span>Twitter</span>
                  <SnsAdressInput placeholder="트위터 @XXXXX를 입력해주세요" />
                </SnsItem>
              </>
            ) : (
              <>
                <SnsItem>
                  <BsGithub />
                </SnsItem>
                <SnsItem>
                  <BsInstagram />
                </SnsItem>
                <SnsItem>
                  <BsTwitter />
                </SnsItem>
              </>
            )}
          </SnsList>
          {retouch ? (
            <Introduce
              value={introduce}
              onChange={(text) => introduceOnClick(text)}
              retouch={retouch}
            />
          ) : (
            <Introduce
              value={"I've developed Web application since 2022"}
              disabled
            />
          )}

          <TagList>
            <TagItem>#개발자{retouch ? <TagXBtn>X</TagXBtn> : null}</TagItem>
            <TagItem>#개발자{retouch ? <TagXBtn>X</TagXBtn> : null}</TagItem>
            <TagItem>#개발자{retouch ? <TagXBtn>X</TagXBtn> : null}</TagItem>
            <TagItem>#개발자{retouch ? <TagXBtn>X</TagXBtn> : null}</TagItem>
            <TagItem>#개발자{retouch ? <TagXBtn>X</TagXBtn> : null}</TagItem>
          </TagList>
          {retouch ? (
            <TagInputDiv retouch={retouch}>
              <span>태그 추가하기</span>
              <TagInput />
            </TagInputDiv>
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
    width: 200px;
    height: 200px;
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
  margin: 0 10px;
  font-size: ${({ theme }) => theme.fontSizes.name};
  cursor: pointer;
  span {
    font-size: ${({ theme }) => theme.fontSizes.lg};
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

const Second = styled(First)``;
const Third = styled(First)``;
const UserIcon = styled(ProfileImg)`
  font-size: 50px;
`;

export default SimpleSlider;
