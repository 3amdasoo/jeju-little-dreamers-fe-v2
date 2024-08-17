import React from "react";
import kakao_login_button_img from "../assets/kakao_login.png";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 30px;
`;

const KakaoLoginButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const KakaoLoginImage = styled.img`
  width: 200px;
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
      <Title>제주 아동급식 카드 가맹점 찾기</Title>
      <Subtitle>제주 꼬망이들</Subtitle>
      <Logo src={logo} alt="Logo" />
      <KakaoLoginButton onClick={handleLogin}>
        <KakaoLoginImage src={kakao_login_button_img} alt="카카오 로그인" />
      </KakaoLoginButton>
    </Container>
  );
}

export default LoginPage;
