import styled from "styled-components";
const HeaderStyle = styled.header`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 400;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <img />
      <Title>제주 꼬망이들</Title>
    </HeaderStyle>
  );
};

export default Header;
