import styled from "styled-components";

const BoxStyle = styled.div`
  width: auto;
  height: auto;
  border-radius: 10px;
  /* border: #ffdd9e 2px solid; */
  background-color: #ff914d;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.2);
  color: white;
  padding: 12px 12px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

const SelectBox = ({ data, onClickKeyword }) => {
  return <BoxStyle onClick={onClickKeyword}>{data}</BoxStyle>;
};

export default SelectBox;
