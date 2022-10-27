import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AutoComplete from "./Autocomplete";

interface Props {
  placeholder: string;
}

const InputBox: FC<Props> = ({ placeholder }) => {
  const [keyword, setKeyword] = useState<string>("");
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  // 검색 목록에서 클릭했을 때 검색창에 결과 텍스트 변경
  const clickedData = (data: string) => {
    setKeyword(data);
  };


  return (
    <div>
      <InputArea
        placeholder={placeholder}
        value={keyword}
        onChange={onChangeData}
      />
      {keyword && <AutoComplete keyword={keyword} clickedData={clickedData}/>}
    </div>
  );
};

const InputArea = styled.input`
  width: 800px;
  height: 80px;
  border-radius: 60px;
  margin-bottom: 80px;
  padding: 0 48px;
  font-size: 24px;
`;

export default InputBox;
