import { useState, useCallback } from "react";
import styled from "styled-components";

const menuList = [
  { id: 1, value: "분식" },
  { id: 2, value: "편의점" },
  { id: 3, value: "마트" },
  { id: 4, value: "정육점" },
  { id: 5, value: "양식" },
  { id: 6, value: "중식당" },
  { id: 7, value: "치킨" },
  { id: 8, value: "카페" },
  { id: 9, value: "디저트" },
  { id: 10, value: "한식" },
  { id: 11, value: "돈가스" },
  { id: 12, value: "일식당" },
  { id: 13, value: "베이커리" },
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

const MenuDropdown = ({ onClick, selectedDropValue }) => {
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
        <SelectBox>메뉴를 골라주세요</SelectBox>
      </BoxContainer>
      {isOpen && (
        <ListContainer>
          {menuList.map((el) => (
            <DropBox onClick={handleItemClick}>{el.value}</DropBox>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default MenuDropdown;
