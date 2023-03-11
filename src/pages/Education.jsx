import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import profileImg from "../image/profileImage/profile3.png";
import info1Img from "../image/info/info1.png";
import info2Img from "../image/info/info2.png";
import info3Img from "../image/info/info3.png";
import info4Img from "../image/info/info4.png";
import info5Img from "../image/info/info5.png";
import info6Img from "../image/info/info6.png";
import mobileInfo1Img from "../image/mobileInfo/mobile-info1.png";
import mobileInfo2Img from "../image/mobileInfo/mobile-info2.png";
import mobileInfo3Img from "../image/mobileInfo/mobile-info3.png";
import mobileInfo4Img from "../image/mobileInfo/mobile-info4.png";
import mobileInfo5Img from "../image/mobileInfo/mobile-info5.png";
import mobileInfo6Img from "../image/mobileInfo/mobile-info6.png";
import arrowRight from "../image/arrow/arrow-right.png";
import arrowLeft from "../image/arrow/arrow-left.png";
import { FaReact } from "@react-icons/all-files/fa";

export default function Education() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // 화살표 표시
    fade: true, // 페이드 효과
    draggable: true,
    prevArrow: (
      <DivPre>
        <SlickArrowPrev />
      </DivPre>
    ),
    nextArrow: (
      <DivNext>
        <SlickArrowNext />
      </DivNext>
    ),
  };
  return (
    <EducationContainer>
      <Slider {...settings}>
        <SliderWrapper>
          <CardWrapper>
            <EducationTitleContainer>
              <EducationTitle>개인 프로필카드 생성</EducationTitle>
            </EducationTitleContainer>
            <Card>
              <CardImage />
              <IconWrapper>
                <FaReact className="icon" />
              </IconWrapper>
              <CardTitle>@2pac</CardTitle>
              <CardSubTitle>Rapper</CardSubTitle>
            </Card>
          </CardWrapper>
        </SliderWrapper>

        <SliderWrapper>
          <CardWrapper>
            <EducationTitleContainer>
              <EducationTitle>내 정보 등록</EducationTitle>
            </EducationTitleContainer>
            <InfoImageContainer>
              <InfoImage className="info1-image" />
              <InfoImage className="info2-image" />
              <InfoImage className="info3-image" />
            </InfoImageContainer>
          </CardWrapper>
        </SliderWrapper>

        <SliderWrapper>
          <CardWrapper>
            <EducationTitleContainer>
              <EducationTitle>다양한 소통 방식</EducationTitle>
            </EducationTitleContainer>
            <InfoImageContainer>
              <InfoImage className="info4-image" />
              <InfoImage className="info5-image" />
              <InfoImage className="info6-image" />
            </InfoImageContainer>
          </CardWrapper>
        </SliderWrapper>
      </Slider>
    </EducationContainer>
  );
}

const EducationContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  padding: 60px 120px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
  @media ${(props) => props.theme.mobile} {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .slick-dots {
      margin-bottom: 70px;
    }
  }
`;
const EducationTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const EducationTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.subTitleSize};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
const SliderWrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    justify-content: center;
  }
`;
const Card = styled.div`
  width: 400px;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 200px;
    height: 200px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
const CardImage = styled.div`
  width: 250px;
  height: 250px;
  background-image: url(${profileImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media ${(props) => props.theme.mobile} {
    width: 100px;
    height: 100px;
  }
`;
const InfoImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 70px;
  padding: 0 30px;
  .info1-image {
    background-image: url(${info1Img});
  }
  .info2-image {
    background-image: url(${info2Img});
  }
  .info3-image {
    background-image: url(${info3Img});
  }
  .info4-image {
    background-image: url(${info4Img});
    width: 400px;
    margin-left: 40px;
  }
  .info5-image {
    background-image: url(${info5Img});
    width: 280px;
  }
  .info6-image {
    background-image: url(${info6Img});
    width: 430px;
    margin-right: 40px;
  }
  @media ${(props) => props.theme.mobile} {
    display: flex;
    .info1-image {
      width: 100%;
      height: 200px;
      background-image: url(${mobileInfo1Img});
      margin-right: 5px;
    }
    .info2-image {
      width: 100%;
      height: 200px;
      background-image: url(${mobileInfo2Img});
      margin-right: 5px;
    }
    .info3-image {
      width: 100%;
      height: 200px;
      background-image: url(${mobileInfo3Img});
    }
    .info4-image {
      background-image: url(${mobileInfo4Img});
      width: 100%;
      height: 40%;
      margin-left: 10px;
    }
    .info5-image {
      background-image: url(${mobileInfo5Img});
      width: 100%;
      height: 40%;
    }
    .info6-image {
      background-image: url(${mobileInfo6Img});
      width: 100%;
      height: 40%;
      margin-right: 10px;
    }
  }
`;
const InfoImage = styled.div`
  width: 250px;
  height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
`;

const CardTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;
const CardSubTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.subColor1};
  margin-bottom: 20px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  right: 20px;
  top: 15px;
  .icon {
    width: 50px;
    height: 50px;
    color: white;
  }
  @media ${(props) => props.theme.mobile} {
    .icon {
      width: 30px;
      height: 30px;
      color: white;
    }
  }
`;
const DivPre = styled.div`
  width: 100px;
  height: 100px;
  z-index: 99;
  line-height: 30px;
  position: absolute;
  left: 0;
`;
const DivNext = styled.div`
  width: 100px;
  height: 100px;
  z-index: 99;
  line-height: 30px;
  position: absolute;
  right: 0;
`;
const SlickArrowPrev = styled.button`
  background: url(${arrowLeft}) no-repeat;
  background-position: center;
  background-size: 100% 100%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  border: none;
  @media ${(props) => props.theme.mobile} {
    width: 40px;
    height: 40px;
    left: -20px;
    bottom: 20px;
  }
`;
const SlickArrowNext = styled.button`
  background: url(${arrowRight}) no-repeat;
  background-position: center;
  background-size: 100% 100%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: 0;
  border: none;
  @media ${(props) => props.theme.mobile} {
    width: 40px;
    height: 40px;
    right: -20px;
    bottom: 20px;
  }
`;
