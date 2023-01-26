import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { api } from "../../api/api";

export default function Certification() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.split("=")[1];

  const onCLickLogin = () => {
    postCertification();
  };

  const postCertification = async () => {
    try {
      const res = await api.get("/user/email-auth", {
        params: {
          id,
        },
      });
      if (res.status === 200) {
        swal({
          text: "이메일 인증 완료 😀",
          buttons: "확인",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          closeOnClickOutside: false,
        }).then(function () {
          navigate("/login");
        });
      }
      return res.data;
    } catch (err) {
      swal({
        text: "이메일 인증 실패 😢",
        buttons: "확인",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        closeOnClickOutside: false,
      }).then(function () {
        return;
      });
    }
  };

  return (
    <CertificationContainer>
      이메일 인증이 완료 되었습니다.
      <CretificationButton onClick={onCLickLogin}>
        로그인 하러가기
      </CretificationButton>
    </CertificationContainer>
  );
}

const CertificationContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
`;
const CretificationButton = styled.button`
  margin-top: 20px;
  background-color: transparent;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  border: 1px solid black;
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor6};
    color: white;
    border: 1px solid transparent;
  }
`;
