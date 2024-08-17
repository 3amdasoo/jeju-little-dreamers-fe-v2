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
        { nickname: "익명1", content: "음식이 정말 맛있었어요. 다시 가고 싶네요!" },
        { nickname: "익명2", content: "직원분들이 너무 친절하셨어요. 기분 좋게 식사했습니다." },
        { nickname: "익명3", content: "아동급식카드도 사용 가능해서 좋았습니다." },
        { nickname: "익명4", content: "재료가 신선하고, 음식도 깔끔했어요." },
        { nickname: "익명5", content: "가격 대비 음식의 품질이 훌륭해요. 강추합니다!" },
        { nickname: "익명6", content: "혼자 먹기에도 편한 분위기였어요. 종종 들를 것 같아요." },
        { nickname: "익명7", content: "매장이 정말 청결해서 안심하고 먹을 수 있었어요." },
        { nickname: "익명8", content: "양이 푸짐해서 배부르게 먹고 왔어요." },
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
