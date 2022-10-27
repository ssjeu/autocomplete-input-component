import React, { FC } from "react";
import styled from "styled-components";
import autoDatas from "./Autocomplete";

type Props = {
  keyItem: string;
  //     data: autoDatas // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const DataSet: FC<Props> = ({ keyItem }) => {
  return <DataSetWrap>{/* <a href="#">{keyItem.name}</a> */}</DataSetWrap>;
};

const DataSetWrap = styled.div`
  padding: 12px;
`;

export default DataSet;
