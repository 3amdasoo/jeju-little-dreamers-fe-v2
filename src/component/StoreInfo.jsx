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
      <InfoDetail><strong>주소 | </strong> {restaurant.address}</InfoDetail>
      <InfoDetail><strong>전화번호 | </strong> {restaurant.phone || "N/A"}</InfoDetail>
      <InfoDetail>{restaurant.category}</InfoDetail>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 300px;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;


const InfoTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InfoDetail = styled.p`
  margin: 5px 0;
`;

export default StoreInfo;
