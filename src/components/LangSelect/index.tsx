import React, { useEffect, useState } from "react";
import { LangType } from "../../typings/db";
import * as S from "./styles";

const LangSelect = (props: LangType) => {
  const { lang } = props;
  const [langState, setLangState] = useState(0);

  const selectLang = (lang: number) => {
    setLangState(lang);
  };

  useEffect(() => {
    lang(langState);
  }, [langState]);

  return (
    <S.ButtonContainer>
      <S.Button onClick={() => selectLang(0)} selectedStyle={langState === 0}>
        En
      </S.Button>
      <S.Button onClick={() => selectLang(1)} selectedStyle={langState === 1}>
        Ko
      </S.Button>
    </S.ButtonContainer>
  );
};

export default LangSelect;
