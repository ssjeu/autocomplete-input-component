import styled from "styled-components";

export const InputAreaWrap = styled.div`
  position: relative;
  width: calc(100% - 48px);
  height: 80px;

  img {
    position: absolute;
    right: -60px;
    top: 2px;
  }
`;

export const InputArea = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 60px;
  margin-bottom: 80px;
  padding-left: 48px;
  font-size: 24px;
`;

export const AutoDataWrap = styled.div<{ display?: boolean }>`
  display: ${(props) => (props.display === true ? null : "none")};
  z-index: 3;
  max-height: 620px;
  width: 50vw;
  border-radius: 20px;
  background-color: white;
  position: absolute;
  top: calc(2vh + 360px);
  border: 2px solid black;
  overflow: auto;
  color: black;
`;

export const AutoData = styled.div<{ isFocus?: boolean }>`
  padding: 20px 48px;
  text-align: left;
  border-bottom: 1px solid;
  background-color: ${(props) => (props.isFocus === true ? "#edf5f5" : "#fff")};
  color: ${(props) => (props.isFocus === true ? "#191970" : "#000")};

  div:nth-of-type(1) {
    font-size: 24px;
  }

  div:nth-of-type(2) {
    font-size: 20px;
    margin-top: 8px;
  }

  div:nth-of-type(3) {
    font-size: 16px;
    color: #6e6e6e;
    margin-top: 4px;
  }

  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
    color: #191970;
  }
`;

export const NoData = styled.div`
  font-size: 24px;
  padding: 20px 0;
`;
