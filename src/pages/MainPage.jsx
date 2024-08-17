import React, { useEffect, useState, useCallback } from "react";
import MenuDropdown from "../component/Dropdown/MenuDropdown";
import PriceDropdown from "../component/Dropdown/PriceDropdown";
import styled from "styled-components";
import Map from "../component/Map/Map";
import nearbyData from "../../src/data/nearby.json";
import menuData from "../../src/data/menu.json";
import SelectBox from "../component/SelectBox";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  z-index: 2;
`;

const ResetBnt = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 10px;
  color: #3a9918;
  font-weight: 600;
`;

const MainPage = () => {
  const [selectedMenuValue, setSelectedMenuValue] = useState("메뉴를 선택해주세요");
  const [selectedPriceValue, setSelectedPriceValue] =
    useState("가격대를 골라주세요");
  const [selected_list, setSelected_list] = useState([]);
  const [filteredDummy, setFilteredDummy] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setIsHidden(true);
  };

  const handleMenuSelected = useCallback((event) => {
    const selectedMenu = event.target.innerText;
    setSelectedMenuValue(selectedMenu);
    setSelected_list((prevList) =>
      prevList.includes(selectedMenu) ? prevList : [...prevList, selectedMenu]
    );
  }, []);

  const handlePriceSelected = useCallback((event) => {
    const selectedPrice = event.target.innerText;
    setSelectedPriceValue(selectedPrice);
    setSelected_list((prevList) =>
      prevList.includes(selectedPrice) ? prevList : [...prevList, selectedPrice]
    );
  }, []);

  const handleClickKeyword = useCallback((event) => {
    const selectedKeyword = event.target.innerText;
    setSelected_list((prevList) =>
      prevList.filter((keyword) => keyword !== selectedKeyword)
    );
  }, []);

  const handleReset = useCallback(() => {
    setSelected_list([]);
  }, []);

  const handleIsOpen = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    const combinedData = nearbyData.map((store) => {
      const matchedMenus = menuData.filter(
        (menu) => menu.store_id === store.id
      );
      return { ...store, menu: matchedMenus };
    });

    let filtered = combinedData;

    if (selected_list.length > 0) {
      filtered = combinedData.filter((item) => {
        const categoryMatch = selected_list.some((keyword) =>
          item.category.includes(keyword)
        );
        const priceMatch = selected_list.some((keyword) => {
          if (keyword === "5000원 이하") {
            return (
              item.menu.length === 0 ||
              item.menu.some((menu) => {
                if (typeof menu.price === "string") {
                  return parseInt(menu.price.replace(/,/g, "")) <= 5000;
                }
                return false;
              })
            );
          } else if (keyword === "5000~10000원") {
            return item.menu.some((menu) => {
              if (typeof menu.price === "string") {
                const price = parseInt(menu.price.replace(/,/g, ""));
                return price > 5000 && price <= 10000;
              }
              return false;
            });
          } else if (keyword === "10000원 이상") {
            return item.menu.some((menu) => {
              if (typeof menu.price === "string") {
                return parseInt(menu.price.replace(/,/g, "")) > 10000;
              }
              return false;
            });
          }
          return false;
        });

        return categoryMatch && priceMatch;
      });
    }

    setFilteredDummy(filtered);
  }, [selected_list]);

  const handleMarkerClick = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  return (
    <PageContainer>
      <SelectContainer>
        <DropdownContainer>
          <MenuDropdown
            onClick={handleMenuSelected}
            selectedDropValue={selectedMenuValue}
          />
          <PriceDropdown
            onClick={handlePriceSelected}
            selectedDropValue={selectedPriceValue}
          />
        </DropdownContainer>
        <ResetBnt onClick={handleReset}>reset</ResetBnt>
      </SelectContainer>
      <KeywordContainer>
        {selected_list.map((el) => (
          <SelectBox key={el} data={el} onClickKeyword={handleClickKeyword} />
        ))}
      </KeywordContainer>
      <Map filteredData={filteredDummy} onMarkerClick={handleMarkerClick} />
      <AreYouSlaveContainer hidden={isHidden} onClick={handleClick}>
        <AreYouSlave>공무원이신가요?</AreYouSlave>
        <ClickText onClick={handleIsOpen}>
          필터링된 가맹점 자료를 이메일로..
        </ClickText>
        <Close>X</Close>
      </AreYouSlaveContainer>
      {isOpenModal && (
        <ModalContainer>
          <Title>안내 제목</Title>
          <Content>
            아동 급식 카드 가맹점 관련 자료는 저희가 검토 및 선별한 내용을
            포함하고 있습니다.
          </Content>
          <Content>
            추가 정보가 필요하시면 아래 이메일로 연락 주시면 자료를
            공유해드리겠습니다.
          </Content>
          <Content>samdasu@jjddai.com</Content>

          <Check onClick={handleIsOpen}>확인</Check>
        </ModalContainer>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const KeywordContainer = styled.div`
  margin: 5px;
  width: 500px;
  height: 30px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

const AreYouSlaveContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  gap: 10px;
`;

const AreYouSlave = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const ClickText = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const Close = styled.button`
  border: none;
  background-color: white;
  font-weight: 900;
`;

const ModalContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 200px;
  left: 100px;

  z-index: 2;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 20px;
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
const Content = styled.div`
  margin: 15px 0px;
`;

const Check = styled.button`
  width: 60px;
  border: none;
  border-radius: 5px;
  background-color: #3a9918;
  color: white;
  font-size: 12px;
  font-weight: 900;
  margin-top: 20px;
`;

export default MainPage;
