import { useState, useCallback } from "react";
import styled from "styled-components";

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
  /* border: 1px solid black; */
  border-radius: 10px;
  padding: 3px;
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
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
  /* height: 30px; */
  margin: 2px 3px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 8px;
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
  max-height: 200px;
  overflow: scroll;
  /* border: 1px solid black; */
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  position: absolute;
  top: 45px;
  z-index: 1;
  padding: 3px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MenuDropdown = ({ onClick, selectedDropValue, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = useCallback(
    (event) => {
      onClick(event);
      setIsOpen(false); // 메뉴 아이템 클릭 시 드롭다운 닫기
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
          {categories.map((category, index) => (
            <DropBox key={index} onClick={handleItemClick}>
              {category}
            </DropBox>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default MenuDropdown;
