import styled from "styled-components";
import { useState, useEffect } from "react";

const RestaurantInfo = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid #7f8c8d;
  margin-bottom: 25px;
`;

const RestaurantName = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const RestaurantDetail = styled.p`
  font-size: 1.1rem;
  margin: 7px 0;
  color: #7f8c8d;
`;

const InfoCard = ({ restaurantData }) => {
  //   const [restaurantData, setRestaurantData] = useState(null);

  //   useEffect(() => {
  //     const dummyData = {
  //       id: "033ca46a84ac226ae7642a67571e4bad",
  //       store: {
  //         id: "35089491",
  //         name: "은희네해장국 서귀포점",
  //         address: "제주특별자치도 서귀포시 토평동 1001-7",
  //         phone: "064-767-0039",
  //         category: "한식, 해장국",
  //         latitude: 33.260485,
  //         longitude: 126.5821782,
  //         image: null,
  //       },
  //       menu: [
  //         {
  //           name: "소고기해장국",
  //           price: "10,000",
  //         },
  //       ],
  //     };

  //     const dummyReviews = [
  //       {
  //         nickname: "익명1",
  //         content: "음식이 정말 맛있었어요. 다시 가고 싶네요!",
  //       },
  //       {
  //         nickname: "익명2",
  //         content: "직원분들이 너무 친절하셨어요. 기분 좋게 식사했습니다.",
  //       },
  //       {
  //         nickname: "익명3",
  //         content: "아동급식카드도 사용 가능해서 좋았습니다.",
  //       },
  //       { nickname: "익명4", content: "재료가 신선하고, 음식도 깔끔했어요." },
  //       {
  //         nickname: "익명5",
  //         content: "가격 대비 음식의 품질이 훌륭해요. 강추합니다!",
  //       },
  //       {
  //         nickname: "익명6",
  //         content: "혼자 먹기에도 편한 분위기였어요. 종종 들를 것 같아요.",
  //       },
  //       {
  //         nickname: "익명7",
  //         content: "매장이 정말 청결해서 안심하고 먹을 수 있었어요.",
  //       },
  //       { nickname: "익명8", content: "양이 푸짐해서 배부르게 먹고 왔어요." },
  //     ];

  //     setRestaurantData(dummyData);
  //     setReviews(dummyReviews);
  //   }, []);

  return (
    restaurantData && (
      <RestaurantInfo>
        <RestaurantName>{restaurantData.store.name}</RestaurantName>
        <RestaurantDetail>
          <strong>주소</strong> {restaurantData.store.address}
        </RestaurantDetail>
        <RestaurantDetail>
          <strong>전화번호</strong> {restaurantData.store.phone}
        </RestaurantDetail>
        <RestaurantDetail>
          <strong>카테고리</strong> {restaurantData.store.category}
        </RestaurantDetail>
      </RestaurantInfo>
    )
  );
};

export default InfoCard;
