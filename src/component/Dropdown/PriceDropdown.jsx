import { useState, useCallback } from "react";
import styled from "styled-components";

const priceList = [
  { id: 1, value: "5000원 이하" },
  { id: 2, value: "5000~10000원" },
  { id: 3, value: "10000원 이상" },
];

const Container = styled.div`
  position: relative;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 30px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 3px;
`;

const SelectBox = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  font-size: 12px;
  font-weight: 600;
`;

const DropBox = styled.div`
  height: 30px;
  margin: 2px 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 5px;
  font-weight: 600;

  &:hover {
    background-color: #edffe6;
  }
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  top: 40px;
  z-index: 1;
  padding: 3px;
`;

const PriceDropdown = ({ onClick, selectedDropValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = useCallback(
    (event) => {
      onClick(event);
      setIsDropdown(false); // 메뉴 아이템 클릭 시 드롭다운 닫기
    },
    [onClick]
  );

  return (
    <Container>
      <BoxContainer onClick={handleOpen}>
        <SelectBox>{selectedDropValue}</SelectBox>
      </BoxContainer>
      {isOpen && (
        <ListContainer>
          {priceList.map((el) => (
            <DropBox onClick={handleItemClick}>{el.value}</DropBox>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default PriceDropdown;
