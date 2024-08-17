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
      <InfoDetail>
        <strong>Address:</strong> {restaurant.address}
      </InfoDetail>
      <InfoDetail>
        <strong>Phone:</strong> {restaurant.phone || "N/A"}
      </InfoDetail>
      <InfoDetail>
        <strong>Category:</strong> {restaurant.category}
      </InfoDetail>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 450px;
  height: 150px;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 40px;
  /* right: 120px; */
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
