import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Restaurant = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const dummyData = {
            id: "033ca46a84ac226ae7642a67571e4bad",
            store: {
                id: "35089491",
                name: "은희네해장국 서귀포점",
                address: "제주특별자치도 서귀포시 토평동 1001-7",
                phone: "064-767-0039",
                category: "한식, 해장국",
                latitude: 33.260485,
                longitude: 126.5821782,
                image: null,
            },
            menu: [
                {
                    name: "소고기해장국",
                    price: "10,000",
                },
            ],
        };

        const dummyReviews = [
            { nickname: "익명142121231", content: "음식이 맛있어요." },
            { nickname: "익명142121232", content: "친절해요." },
            { nickname: "익명142121233", content: "아동급식카드를 받아요." },
            { nickname: "익명142121234", content: "재료가 신선해요." },
            { nickname: "익명142121235", content: "가성비가 좋아요." },
            { nickname: "익명142121236", content: "혼밥하기 좋아요." },
            { nickname: "익명142121237", content: "매장이 청결해요." },
            { nickname: "익명142121238", content: "양이 많아요." },
        ];

        setRestaurantData(dummyData);
        setReviews(dummyReviews);
    }, []);

    const handleWriteReview = () => {
        navigate(`/restaurant/${id}/review`, {
            state: { restaurantName: restaurantData.store.name }
        });
    };

    if (!restaurantData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card>
                <RestaurantInfo>
                    <RestaurantName>{restaurantData.store.name}</RestaurantName>
                    <RestaurantDetail><strong>주소:</strong> {restaurantData.store.address}</RestaurantDetail>
                    <RestaurantDetail><strong>전화번호:</strong> {restaurantData.store.phone}</RestaurantDetail>
                    <RestaurantDetail><strong>카테고리:</strong> {restaurantData.store.category}</RestaurantDetail>
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

const Container = styled.div`
    padding: 20px;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: "Noto Sans", sans-serif;
`;

const Card = styled.div`
    background-color: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const RestaurantInfo = styled.div`
    margin-bottom: 20px;
`;

const RestaurantName = styled.h1`
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
`;

const RestaurantDetail = styled.p`
    font-size: 1rem;
    margin: 5px 0;
    color: #666;
`;

const MenuSection = styled.div``;

const MenuTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #444;
`;

const MenuList = styled.ul`
    padding-left: 20px;
`;

const MenuItem = styled.li`
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: #555;
`;

const ReviewSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ReviewTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #444;
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ReviewCard = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.08);
`;

const ReviewNickname = styled.span`
    font-weight: bold;
    color: #2980b9;
    display: block;
    margin-bottom: 5px;
`;

const WriteReviewButton = styled.button`
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2980b9;
    }
`;
