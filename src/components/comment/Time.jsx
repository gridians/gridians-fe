import React from "react";
import styled from "styled-components";

export default function Time() {
  const todayTime = () => {
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = week[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return (
      todayYear +
      "." +
      todayMonth +
      "." +
      todayDate +
      dayOfWeek +
      hours +
      ":" +
      minutes
    );
  };
  return (
    <TimeContainer>
      <Border />
      {todayTime().slice(0, 9)}
      <TimeSpan>{todayTime().slice(9, 12)}</TimeSpan>
      <TimeSpan>{todayTime().slice(12, 19)}</TimeSpan>
    </TimeContainer>
  );
}

const TimeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Border = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
  margin: 0 20px;
`;
const TimeSpan = styled.span`
  margin-left: 10px;
`;
