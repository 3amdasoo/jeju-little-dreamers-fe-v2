import React from "react";
import kakao_login_button_img from "../assets/kakao_login.png";
import logo from "../assets/logo.png";
import logoTitle from "../assets/logoImg.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  padding: 20px;
`;

const Title = styled.h1`
  /* font-size: 24px; */
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 200px;
`;

const KakaoLoginButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  margin-top: 100px;
`;

const KakaoLoginImage = styled.img`
  width: 300px;
`;

const LoginPage = () => {
  const kakaoApiKey = "6022b3ea363825dba0253bc58c3f328c"; // REST API KEY
  const redirect_uri = "http://52.78.88.248/auth"; // Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <TitleImg src={logoTitle} />
      {/* <Title >제주 꼬망이들</Title> */}
      {/* <Subtitle>제주 아동급식 카드 가맹점 찾기 서비스</Subtitle> */}
      <KakaoLoginButton onClick={handleLogin}>
        <KakaoLoginImage src={kakao_login_button_img} alt="카카오 로그인" />
      </KakaoLoginButton>
    </Container>
  );
};

export default LoginPage;

const TitleImg = styled.img`
  width: 400px;
`;
