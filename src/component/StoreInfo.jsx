import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StoreInfo = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <InfoContainer onClick={handleClick}>
      <InfoTitle>{restaurant.name}</InfoTitle>
      <DetailsContainer>
        <DetailDiv>
          <Element>주소 | </Element>
          <InfoDetail>{restaurant.address}</InfoDetail>
        </DetailDiv>

        <DetailDiv>
          <Element>전화번호 | </Element>
          <InfoDetail>
            {restaurant.phone || "등록된 번호가 없습니다"}
          </InfoDetail>
        </DetailDiv>

        <DetailDiv>
          <Element>분류 | </Element>
          <InfoDetail>{restaurant.category}</InfoDetail>
        </DetailDiv>
      </DetailsContainer>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 450px;
  height: 300px;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 385px;
  left: 8px;
  /* transform: translate(-50%, 50%); */
  z-index: 10;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Element = styled.strong`
  font-size: 20px;
`;

const InfoTitle = styled.h1`
  margin-bottom: 40px;
  padding: 0px;
`;

const InfoDetail = styled.div`
  /* margin: 5px 0; */
  font-size: 20px;
`;

export default StoreInfo;
