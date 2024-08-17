import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';


const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { restaurantName } = location.state || {};
    const [customReview, setCustomReview] = useState('');
    const [selectedReviews, setSelectedReviews] = useState([]);

    const predefinedReviews = [
        { id: 1, label: "음식이 맛있어요.", polarOpposite: 2 },
        { id: 2, label: "음식이 맛없어요.", polarOpposite: 1 },
        { id: 3, label: "친절해요.", polarOpposite: 4 },
        { id: 4, label: "불친절해요", polarOpposite: 3 },
        { id: 5, label: "아동급식카드 받아요", polarOpposite: 6 },
        { id: 6, label: "아동급식카드 안받아요", polarOpposite: 5 },
    ];

    const handleCustomReviewChange = (e) => {
        setCustomReview(e.target.value);
    };

    const handleReviewToggle = (id) => {
        const selectedReview = predefinedReviews.find(review => review.id === id);
        const polarOppositeReviewId = selectedReview.polarOpposite;

        if (selectedReviews.includes(id)) {
            // 이미 선택된 리뷰라면 선택 해제
            setSelectedReviews(selectedReviews.filter(reviewId => reviewId !== id));
        } else {
            // 반대되는 리뷰는 제외하고 현재 리뷰를 선택
            setSelectedReviews([
                ...selectedReviews.filter(reviewId => reviewId !== polarOppositeReviewId),
                id
            ]);
        }
    };

    const handleSubmit = () => {
        const finalReview = customReview || selectedReviews.map(id => predefinedReviews.find(review => review.id === id).label).join(', ');
        if (finalReview) {
            console.log(`리뷰 제출: ${finalReview}`);
            alert("리뷰가 제출되었습니다!");
            // 이전 페이지로 돌아가기
            const restaurantId = location.pathname.split('/')[2]; // 현재 경로에서 식당 ID를 추출
            navigate(`/restaurant/${restaurantId}`); // /restaurant/:id 경로로 이동
        } else {
            alert("리뷰를 작성하거나 선택해주세요.");
        }
    };
    return (
        <Container>
            <h1>{restaurantName ? `${restaurantName}` : "리뷰 작성"}</h1>
            <Description>리뷰는 익명으로 작성됩니다.</Description>

            <Textarea
                placeholder="리뷰를 입력해주세요..."
                value={customReview}
                onChange={handleCustomReviewChange}
            />

            <ReviewLabel>리뷰를 선택하세요:</ReviewLabel>
            <ButtonContainer>
                {predefinedReviews.map((review, index) => {
                    if (index % 2 === 0) {
                        const oppositeReview = predefinedReviews.find(r => r.id === review.polarOpposite);
                        return (
                            <ReviewPair key={review.id}>
                                <ReviewButton
                                    isSelected={selectedReviews.includes(review.id)}
                                    onClick={() => handleReviewToggle(review.id)}
                                >
                                    {review.label}
                                </ReviewButton>
                                <ReviewButton
                                    isSelected={selectedReviews.includes(oppositeReview.id)}
                                    onClick={() => handleReviewToggle(oppositeReview.id)}
                                >
                                    {oppositeReview.label}
                                </ReviewButton>
                            </ReviewPair>
                        );
                    }
                    return null; // odd indexed review is handled with its pair, so we skip it here
                })}
            </ButtonContainer>

            <SubmitButton onClick={handleSubmit}>작성하기</SubmitButton>
        </Container>
    );
};

export default Review;

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 30px 20px;
    background-color: #f7f9fa;
    border-radius: 12px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Description = styled.p`
    margin-top: 20px;
    font-size: 1.1rem;
    color: #7f8c8d;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 120px;
    margin-top: 20px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    resize: none;
    margin-bottom: 30px;
    box-sizing: border-box;
`;

const ReviewLabel = styled.p`
    margin-bottom: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #34495e;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 40px;
`;

const ReviewPair = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 15px;
`;

const ReviewButton = styled.button`
    padding: 12px 20px;
    background-color: ${({ isSelected }) => (isSelected ? '#3498db' : '#ecf0f1')};
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    flex: 1;
    min-width: 120px;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? '#2980b9' : '#bdc3c7')};
    }
`;

const SubmitButton = styled.button`
    padding: 15px;
    background-color: #2ecc71; 
    color: #fff;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #27ae60; 
    }
    margin-top: 30px;
    align-self: center;
    width: 100%;
    max-width: 200px;
`;
