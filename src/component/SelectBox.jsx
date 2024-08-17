import styled from "styled-components";

const BoxStyle = styled.div`
  width: auto;
  height: auto;
  border-radius: 10px;
  border: #269600 1px solid;
  background-color: #269600;
  color: #eeffd3;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

const SelectBox = ({ data, onClickKeyword }) => {
  return <BoxStyle onClick={onClickKeyword}>{data}</BoxStyle>;
};

export default SelectBox;
