import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Time from "../components/comment/Time";
import weather from "../image/weather.png";

export default function Home() {
  const [coords, saveCoords] = useState();
  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState();

  function handleGeoSucc(position) {
    const latitude = position.coords.latitude; // 경도
    const longitude = position.coords.longitude; // 위도
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    console.log("geo err! " + err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  function getWeather(lat, lon) {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const temp = data.main.temp;
        const weathers = data.weather[data.weather.length - 1];
        setTemp(temp);
        setWeather(weathers.main);
      });
  }

  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <HomeContainer>
      {/* <Comment /> */}
      <HomeWrapper>
        <HomeLeftWrapper>
          <HomeMainWrapper>
            <HomeMainTitleWrapper>
              <HomeMainTitlePadding>
                <HomeMainTitle>Devember</HomeMainTitle>
              </HomeMainTitlePadding>
            </HomeMainTitleWrapper>

            <HomeMainInfoWrapper>
              <HomeMainTitle
                style={{
                  backgroundColor: "transparent",
                  marginBottom: "300px",
                  paddingLeft: "80px",
                }}
              >
                Weather
                <HomeWeatherTitleWrapper>
                  {/* <img src=$`{weatherIcon}> */}

                  <HomeWeatherIcon />
                  <HomeWeatherTitle>{weather}</HomeWeatherTitle>
                  <HomeWeatherTitle>{temp}</HomeWeatherTitle>
                </HomeWeatherTitleWrapper>
              </HomeMainTitle>

              <HomeMainInfoSiteWrapper>
                <HomeMainInfoTitle>GitHub Profile Card</HomeMainInfoTitle>
              </HomeMainInfoSiteWrapper>
            </HomeMainInfoWrapper>
          </HomeMainWrapper>

          <HomeSubContainer>
            <HomeSubWrapper>
              <HomeSubTitleWrapper>
                <HomeSubTitlePadding>
                  <HomeSubTItle>Introduce</HomeSubTItle>
                </HomeSubTitlePadding>
              </HomeSubTitleWrapper>

              <HomeSubInfoWrapper>
                <HomeSubInfoTitleWrapper>
                  <HomeSubInfoTitle>
                    Github API를 받아와서 프로필을 보여주는 사이트
                  </HomeSubInfoTitle>

                  <HomeSubInfoTitle>
                    Github Read Me에 카드를 만들어봐요
                  </HomeSubInfoTitle>
                </HomeSubInfoTitleWrapper>
              </HomeSubInfoWrapper>
            </HomeSubWrapper>

            <HomeSubWrapper>
              <HomeSubTitleWrapper>
                <HomeSubTitlePadding>
                  <HomeSubTItle>CardProfile</HomeSubTItle>
                </HomeSubTitlePadding>
              </HomeSubTitleWrapper>

              <HomeSubInfoWrapper>
                <HomeSubInfoTitleWrapper>
                  <HomeSubInfoTitle>
                    Github API를 받아와서 프로필을 보여주는 사이트
                  </HomeSubInfoTitle>

                  <HomeSubInfoTitle>
                    Github Read Me에 카드를 만들어봐요
                  </HomeSubInfoTitle>
                </HomeSubInfoTitleWrapper>
              </HomeSubInfoWrapper>
            </HomeSubWrapper>
          </HomeSubContainer>
        </HomeLeftWrapper>

        <HomeRightWrapper>
          <HomeRightPadding>
            <HomeTimeWrapper>
              <HomeTime>
                <Time />
              </HomeTime>
            </HomeTimeWrapper>
          </HomeRightPadding>
        </HomeRightWrapper>
      </HomeWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.mainColor};
  padding: 100px;
  border: 1px solid black;
  align-items: center;
`;
const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #7385984c;
  border-radius: 10px;
`;
const HomeLeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 2;
  overflow: hidden;
`;
const HomeMainWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;
const HomeMainTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 30px;
`;

const HomeMainTitlePadding = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor4};
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HomeMainTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  padding-top: 20px;
`;
const HomeWeatherTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const HomeWeatherIcon = styled.div`
  background-image: url(${weather});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 50px;
  height: 50px;
`;

const HomeWeatherTitle = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;
const HomeMainInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 20px 20px 0;
  border-right: 1px solid ${({ theme }) => theme.colors.subColor4};
`;
const HomeMainInfoSiteWrapper = styled.div`
  width: 100%;
  margin-right: 170px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  text-align: end;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor4};
`;
const HomeMainInfoTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: bold;
`;

const HomeSubContainer = styled.div`
  scroll-snap-type: y mandatory;
  height: 100%;
  overflow-y: scroll;
  flex: 2;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const HomeSubWrapper = styled.div`
  scroll-snap-align: start;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 70px 10px;
`;
const HomeSubTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 20px;
`;
const HomeSubTitlePadding = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subColor4};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const HomeSubTItle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  padding-bottom: 20px;
`;
const HomeSubInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-weight: bold;
  padding: 20px 25px;
`;
const HomeSubInfoTitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
`;
const HomeSubInfoTitle = styled.span`
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const marquee = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
`;

const HomeRightWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 50px 0;
`;
const HomeRightPadding = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.colors.subColor4};
`;
const HomeTimeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.mainColor};
  margin-top: 20px;
  margin-left: 140px;
  overflow: hidden;
  width: 76%;
  height: 5%;
`;
const HomeTime = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: bold;
  animation: ${marquee} 10s linear infinite;
  width: 100%;
  height: 100%;
`;
