import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Restaurant = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const menuResponse = await axios.get(`/api/stores/menu`, {
                    params: { storeId: id },
                });

                const reviewResponse = await axios.get(`/api/stores/review`, {
                    params: { storeId: id },
                });

                if (menuResponse.data && menuResponse.data.length > 0) {
                    const storeData = menuResponse.data[0].store;
                    const menuItems = menuResponse.data.map((item) => ({
                        name: item.name,
                        price: item.price,
                    }));
                    setRestaurantData({
                        ...storeData,
                        menu: menuItems,
                    });
                }

                if (reviewResponse.data) {
                    const fetchedReviews = reviewResponse.data.map((review) => ({
                        nickname: `익명${review.id}`, // or map to actual nickname if available
                        content: review.content,
                    }));
                    setReviews(fetchedReviews);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRestaurantData();
    }, [id]);

    const handleWriteReview = () => {
        navigate(`/restaurant/${id}/review`, {
            state: { restaurantName: restaurantData.name },
        });
    };

    if (!restaurantData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card>
                <RestaurantInfo>
                    <RestaurantName>{restaurantData.name}</RestaurantName>
                    <RestaurantDetail><strong>주소:</strong> {restaurantData.address}</RestaurantDetail>
                    <RestaurantDetail><strong>전화번호:</strong> {restaurantData.phone}</RestaurantDetail>
                    <RestaurantDetail><strong>카테고리:</strong> {restaurantData.category}</RestaurantDetail>
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
            <ReviewSection>
                <ReviewTitle>리뷰</ReviewTitle>
                <WriteReviewButton onClick={handleWriteReview}>
                    리뷰 작성하기
                </WriteReviewButton>
                <ReviewList>
                    {reviews.map((review, index) => (
                        <ReviewCard key={index}>
                            <ReviewNickname>{review.nickname}:</ReviewNickname> {review.content}
                        </ReviewCard>
                    ))}
                </ReviewList>
            </ReviewSection>
        </Container>
    );
};

export default Restaurant;

// Styled components remain unchanged
const Container = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 900px;
    margin: 0 auto;
    font-family: "Noto Sans", sans-serif;
`;

const Card = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
`;

const RestaurantInfo = styled.div`
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
