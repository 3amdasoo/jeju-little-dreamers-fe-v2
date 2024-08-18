import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/download.gif";
import axios from "axios";

const Restaurant = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(
          `http://52.78.88.248/api/stores/menu`,
          {
            params: {
              storeId: id,
            },
          }
        );

        const fetchedData = response.data;

        const formattedData = {
          id: fetchedData.storeId,
          store: {
            name: fetchedData.storeName,
            address: fetchedData.storeAddress,
            phone: fetchedData.storePhone,
            category: fetchedData.category,
          },
          menu:
            fetchedData.menus.length > 0
              ? fetchedData.menus.map((item) => ({
                  name: item.name,
                  price: item.price,
                }))
              : null,
        };

        setRestaurantData(formattedData);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchReviewsData = async () => {
      try {
        const response = await axios.get(
          `http://52.78.88.248/api/stores/review`,
          {
            params: {
              storeId: id,
            },
          }
        );

        if (response.data.length > 0) {
          setReviews(response.data);
        } else {
          setReviews([]); // Set an empty array if there are no reviews
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // Handle error by setting an empty array
      } finally {
        setReviewsLoaded(true); // Mark that reviews have been loaded
      }
    };

    fetchRestaurantData();
    fetchReviewsData();
  }, [id]);

  const handleWriteReview = () => {
    navigate(`/restaurant/${id}/review`, {
      state: { restaurantName: restaurantData.store.name },
    });
  };

  if (!restaurantData) {
    return (
      <LoadingDiv>
        잠시만 기다려주세요!
        <Loading src={loading} />
      </LoadingDiv>
    );
  }

  return (
    <Container>
      <CardContainer>
        <Card>
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
        </Card>
        <Card>
          <MenuSection>
            <MenuTitle>메뉴</MenuTitle>
            {restaurantData.menu ? (
              <MenuList>
                {restaurantData.menu.map((item, index) => (
                  <MenuItem key={index}>
                    {item.name} - {item.price}원
                  </MenuItem>
                ))}
              </MenuList>
            ) : (
              <NoMenuMessage>메뉴 정보가 없습니다.</NoMenuMessage>
            )}
          </MenuSection>
        </Card>
      </CardContainer>
      <ReviewSection>
        <ReviewHeader>
          <ReviewTitle>리뷰</ReviewTitle>
          <WriteReviewButton onClick={handleWriteReview}>
            리뷰 작성하기
          </WriteReviewButton>
        </ReviewHeader>
        <ReviewBoxContainer>
          <TotalReview>총 30건</TotalReview>
          <ReviewBox>
            <ReviewContent>맛있어요</ReviewContent>
            <RateBox>
              <Count>23건</Count>
            </RateBox>
          </ReviewBox>
          <ReviewBox>
            <ReviewContent>친절해요</ReviewContent>
            <RateBox>
              <Count>23건</Count>
            </RateBox>
          </ReviewBox>
          <ReviewBox>
            <ReviewContent>아동 급식카드를 받아요</ReviewContent>
            <RateBox>
              <Count>23건</Count>
            </RateBox>
          </ReviewBox>
        </ReviewBoxContainer>
        <ReviewList>
          {reviewsLoaded && reviews.length === 0 ? (
            <NoReviewsMessage>리뷰가 없습니다.</NoReviewsMessage>
          ) : (
            reviews.map((review, index) => (
              <ReviewCard key={index}>
                <ReviewNickname>익명의 누군가</ReviewNickname> {review.content}
              </ReviewCard>
            ))
          )}
        </ReviewList>
      </ReviewSection>
    </Container>
  );
};

export default Restaurant;

const LoadingDiv = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-weight: 600;
  font-size: 20px;
`;

const Loading = styled.img`
  width: 400px;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TotalReview = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const ReviewBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewBox = styled.div`
  margin-bottom: 5px;
`;

const RateBox = styled.div`
  width: auto;
  height: 30px;
  background-color: #ff914d;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
`;

const ReviewContent = styled.h3`
  margin: 0px 0px 3px;
  color: #2c3e50;
`;

const Count = styled.div`
  background-color: #2ecc71;
  text-align: center;
  color: white;
  width: 320px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 900px;
  margin: 0 auto;
  font-family: "Noto Sans", sans-serif;
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  /* gap: 5px; */
`;

const Card = styled.div``;

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

const MenuSection = styled.div`
  margin-top: 20px;
`;

const MenuTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #34495e;
`;

const MenuList = styled.ul`
  padding-left: 5px;
`;

const MenuItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #7f8c8d;
  font-weight: 500;
`;

const NoMenuMessage = styled.div`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;

  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  gap: 15px;
`;

const ReviewTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #34495e;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewCard = styled.div`
  background-color: #efefef;
  border-radius: 10px;
  padding: 20px;
  /* box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05); */
`;

const ReviewNickname = styled.span`
  font-weight: bold;
  color: black;
  display: block;
  margin-bottom: 20px;
`;

const WriteReviewButton = styled.button`
  padding: 12px 25px;
  color: #333;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* align-self: flex-end; */
  /* margin-bottom: 25px; */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2ecc71;
    color: white;
  }
`;

const NoReviewsMessage = styled.div`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin-top: 20px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.05);
`;
