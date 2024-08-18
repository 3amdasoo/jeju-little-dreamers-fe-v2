import React, { useEffect, useState, useCallback } from "react";
import MenuDropdown from "../component/Dropdown/MenuDropdown";
import PriceDropdown from "../component/Dropdown/PriceDropdown";
import styled from "styled-components";
import Map from "../component/Map/Map";
import SelectBox from "../component/SelectBox";
import StoreInfo from "../component/StoreInfo";

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 15px;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  z-index: 4;
`;

const ResetBnt = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: #2ecc71;
  color: white;
  cursor: pointer;
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  /* align-self: flex-end; */
  /* margin-bottom: 25px; */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff914d;
    color: white;
  }
`;

const MainPage = () => {
  const [selectedMenuValue, setSelectedMenuValue] =
    useState("메뉴를 선택해주세요");
  const [selectedPriceValue, setSelectedPriceValue] =
    useState("가격대를 골라주세요");
  const [selectedList, setSelectedList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleClick = useCallback(() => {
    setIsHidden(true);
  }, []);

  const handleMenuSelected = useCallback((event) => {
    const selectedMenu = event.target.innerText;
    console.log(`Menu selected: ${selectedMenu}`);
    setSelectedMenuValue(selectedMenu);
    setSelectedList((prevList) =>
      prevList.includes(selectedMenu) ? prevList : [...prevList, selectedMenu]
    );
  }, []);

  const handlePriceSelected = useCallback((event) => {
    const selectedPrice = event.target.innerText;
    console.log(`Price selected: ${selectedPrice}`);
    setSelectedPriceValue(selectedPrice);
    setSelectedList((prevList) =>
      prevList.includes(selectedPrice) ? prevList : [...prevList, selectedPrice]
    );
  }, []);

  const handleClickKeyword = useCallback((event) => {
    const selectedKeyword = event.target.innerText;
    console.log(`Keyword clicked for removal: ${selectedKeyword}`);
    setSelectedList((prevList) =>
      prevList.filter((keyword) => keyword !== selectedKeyword)
    );
  }, []);

  // Reset logic enhancement
  const handleReset = useCallback(() => {
    console.log("Resetting filters");
    setSelectedList([]);
    setFilteredData(originalData);
    setSelectedMenuValue("메뉴를 선택해주세요");
    setSelectedPriceValue("가격대를 골라주세요");
  }, [originalData]);

  const handleIsOpen = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const fetchStoresData = useCallback(async (latitude, longitude) => {
    try {
      console.log(
        `Fetching stores data at location: ${latitude}, ${longitude}`
      );
      const response = await fetch(
        `http://52.78.88.248/api/stores/search?latitude=${latitude}&longitude=${longitude}&range=2000`
      );
      const data = await response.json();
      setOriginalData(data);
      setFilteredData(data);

      const uniqueCategories = [
        ...new Set(data.map((store) => store.category)),
      ];
      console.log("Unique categories fetched:", uniqueCategories);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    }
  }, []);

  useEffect(() => {
    const handleLocationError = (error) => {
      const errorMessages = {
        1: "User denied the request for Geolocation.",
        2: "Location information is unavailable.",
        3: "The request to get user location timed out.",
        0: "An unknown error occurred.",
      };
      console.error(errorMessages[error.code] || errorMessages[0]);
    };

    const handleLocationSuccess = ({ coords: { latitude, longitude } }) => {
      console.log("User location obtained:", { latitude, longitude });
      fetchStoresData(latitude, longitude);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [fetchStoresData]);

  // Enhanced filtering logic using category instead of menu
  useEffect(() => {
    if (selectedList.length === 0) {
      console.log("No filters selected, displaying original data.");
      setFilteredData(originalData);
    } else {
      console.log("Filtering data based on selected list:", selectedList);
      const filtered = originalData.filter((store) => {
        const categoryMatch = selectedList.some(
          (selected) => store.category && store.category.includes(selected)
        );
        console.log(
          `Checking store "${store.name}" (Category: ${store.category})`
        );
        console.log(`Category match: ${categoryMatch}`);

        const categoryFilterActive = selectedList.some((keyword) =>
          categories.includes(keyword)
        );
        console.log(`Category filter active: ${categoryFilterActive}`);

        if (categoryFilterActive) {
          console.log(`Store "${store.name}" included: ${categoryMatch}`);
          return categoryMatch;
        } else {
          console.log(
            `Store "${store.name}" included: true (no active filters)`
          );
          return true;
        }
      });
      console.log("Filtered data:", filtered);
      setFilteredData(filtered);
    }
  }, [selectedList, originalData, categories]);

  const handleMarkerClick = useCallback((restaurant) => {
    console.log("Restaurant marker clicked:", restaurant.name);
    setSelectedRestaurant(restaurant);
  }, []);

  return (
    <PageContainer>
      <SelectContainer>
        <DropdownContainer>
          <MenuDropdown
            onClick={handleMenuSelected}
            selectedDropValue={selectedMenuValue}
            categories={categories}
          />
          <PriceDropdown
            onClick={handlePriceSelected}
            selectedDropValue={selectedPriceValue}
          />
        </DropdownContainer>
        <ResetBnt onClick={handleReset}>Reset</ResetBnt>
      </SelectContainer>
      <KeywordContainer>
        {selectedList.map((el) => (
          <SelectBox key={el} data={el} onClickKeyword={handleClickKeyword} />
        ))}
      </KeywordContainer>
      <Map filteredData={filteredData} onMarkerClick={handleMarkerClick} />
      {selectedRestaurant && <StoreInfo restaurant={selectedRestaurant} />}
      <AreYouSlaveContainer hidden={isHidden}>
        <AreYouSlave>공무원이신가요?</AreYouSlave>
        <ClickText onClick={handleIsOpen}>
          필터링된 가맹점 자료를 이메일로 받아보기
        </ClickText>
        <Close onClick={handleClick}>X</Close>
      </AreYouSlaveContainer>
      {isOpenModal && (
        <ModalContainer>
          <Title>가맹점 추가 정보 신청 안내</Title>
          <ContentContainer>
            <Content>본 서비스는 직접 검토 및 선별한</Content>
            <Content>아동급식카드 가맹점 정보를 제공하고 있습니다.</Content>
            <Content>가맹점 추가 정보 수신을 원하는 경우</Content>
            <Content>아래 이메일로 신청해주시면</Content>
            <Content>
              부적합 가맹점 정보를 포함한 SVC파일을 보내드립니다.
            </Content>
            <Email>서비스 문의 : samdasu@jjddai.com</Email>
          </ContentContainer>
          <Check onClick={handleIsOpen}>확인</Check>
        </ModalContainer>
      )}
      {/* {selectedRestaurant && <nfoCard IrestaurantData={selectedRestaurant} />} */}
    </PageContainer>
  );
};

const Email = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

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
  position: absolute;
  top: 80px;
  z-index: 3;
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
  font-weight: 700;
`;

const ClickText = styled.span`
  padding: 5px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 700;
  color: #2ecc71;
  cursor: pointer;

  &:hover {
    background-color: #2ecc71;
    color: white;
  }
`;

const Close = styled.button`
  border: none;
  background-color: white;
  font-weight: 900;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 200px;
  left: 30px;
  z-index: 11;
  background-color: white;
  /* border: 5px solid #2ecc71; */
  box-shadow: 0 5px 20px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: start; */
`;

const Content = styled.div`
  /* text-align: start; */
  line-height: 30px;
  margin: 0px 15px;
`;

const Check = styled.button`
  width: 90px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #2ecc71;
  color: white;
  font-size: 12px;
  font-weight: 900;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #ff914d;
    color: white;
  }
`;

export default MainPage;
