import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
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
        const response = await axios.get(`http://52.78.88.248/api/stores/menu`, {
          params: {
            storeId: id,
          },
        });

        if (response.data.length > 0) {
          const fetchedData = response.data[0];
          const formattedData = {
            id: fetchedData.id,
            store: fetchedData.store,
            menu: response.data.map(item => ({
              name: item.name,
              price: item.price,
            })),
          };
          setRestaurantData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchReviewsData = async () => {
      try {
        const response = await axios.get(`http://52.78.88.248/api/stores/review`, {
          params: {
            storeId: id,
          },
        });

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
    return <div>Loading...</div>;
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
            <MenuList>
              {restaurantData.menu.map((item, index) => (
                <MenuItem key={index}>
                  {item.name} - {item.price}원
                </MenuItem>
              ))}
            </MenuList>
          </MenuSection>
        </Card>
      </CardContainer>
      <ReviewSection>
        <ReviewTitle>리뷰</ReviewTitle>
        <WriteReviewButton onClick={handleWriteReview}>
          리뷰 작성하기
        </WriteReviewButton>
        <ReviewBoxContainer>
          <ReviewBox>
            <ReviewContent>맛있어요</ReviewContent>
            <Count>23건</Count>
          </ReviewBox>
          <ReviewBox>
            <ReviewContent>친절해요</ReviewContent>
            <Count>23건</Count>
          </ReviewBox>
          <ReviewBox>
            <ReviewContent>아동 급식카드를 받아요</ReviewContent>
            <Count>23건</Count>
          </ReviewBox>
        </ReviewBoxContainer>
        <ReviewList>
          {reviewsLoaded && reviews.length === 0 ? (
            <NoReviewsMessage>리뷰가 없습니다.</NoReviewsMessage>
          ) : (
            reviews.map((review, index) => (
              <ReviewCard key={index}>
                <ReviewNickname>익명의 누군가</ReviewNickname>{" "}
                {review.content}
              </ReviewCard>
            ))
          )}
        </ReviewList>
      </ReviewSection>
    </Container>
  );
};

export default Restaurant;

// Styled components remain unchanged

const ReviewBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewContent = styled.div``;
const Count = styled.div``;

const Container = styled.div`
  padding: 20px;
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
  font-family: "Noto Sans", sans-serif;
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  gap: 15px;
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
  padding-left: 20px;
`;

const MenuItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2c3e50;
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
  background-color: #f7f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

const ReviewNickname = styled.span`
  font-weight: bold;
  color: #2980b9;
  display: block;
  margin-bottom: 10px;
`;

const WriteReviewButton = styled.button`
  padding: 12px 25px;
  background-color: #3498db;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 25px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const NoReviewsMessage = styled.div`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin-top: 20px;
`;
