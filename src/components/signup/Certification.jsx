import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { myPageUseMutationPutEditEmail } from "../../apis/queries/myPageQuery";
import { api } from "../../apis/untils";
import { getCookieToken, removeCookieToken } from "../../cookie/cookie";

export default function Certification() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.search.split("=")[1];
  const token = getCookieToken("accessToken");

  const { mutate: putEditEmail } = useMutation(
    (id) => myPageUseMutationPutEditEmail(id),
    {
      onSuccess: () => {
        removeCookieToken();
        window.location.replace("/login");
      },
    }
  );

  const onClickLogin = () => {
    if (token === undefined) {
      postCertification(id);
      // getUserInfoValue(id);
    } else if (token) {
      putEditEmail(id);
    } else {
      return;
    }
  };

  const postCertification = async () => {
    try {
      const res = await api.get("/user/auth/email-auth", {
        params: {
          id,
        },
      });
      if (res.status === 200) {
        Swal.fire({
          title: "이메일 인증 완료 😀",
          padding: "3em",
          buttons: "확인",
          closeOnClickOutside: false,
        }).then(function () {
          navigate("/login");
        });
      }
      return res.data;
    } catch (err) {
      Swal.fire({
        title: "이메일 인증 실패 😢",
        buttons: "확인",
        padding: "3em",
        closeOnClickOutside: false,
      });
    }
  };

  return (
    <CertificationContainer>
      이메일 인증이 완료 되었습니다.
      <CretificationButton onClick={onClickLogin}>
        로그인 하러가기
      </CretificationButton>
    </CertificationContainer>
  );
}

const CertificationContainer = styled.div`
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
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
