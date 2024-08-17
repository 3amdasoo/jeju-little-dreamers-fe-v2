import styled from "styled-components";
import title from "../../assets/logoTitle.png";

const HeaderStyle = styled.header`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  /* overflow: hidden; */
  justify-content: center;
  align-items: center;
  /* border-bottom: 1px solid; */
`;

const TitleImg = styled.img`
  width: 500px;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <TitleImg src={title} alt="" />
    </HeaderStyle>
  );
};

export default Header;
