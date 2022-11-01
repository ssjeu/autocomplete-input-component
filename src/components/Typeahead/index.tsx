import React, { FC, useCallback, useEffect, useState, useRef } from "react";
import * as S from "./styles";
import Spinner from "../../assets/spinner.gif";

interface Props {
  dataUrl: String;
  placeholder: string;
}

interface autoDatas {
  id: string;
  age: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

const InputBox: FC<Props> = ({ dataUrl, placeholder }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [keyItems, setKeyItems] = useState<autoDatas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showData, setShowData] = useState<boolean>(false);
  const closeRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState<number>(-1);
  const autoRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollActive, setScrollActive] = useState<boolean>(false);

  const fetchData = () => {
    return fetch(`${dataUrl}`).then((res) => res.json());
  };

  interface IName {
    includes(data: string): boolean;
    name?: any;
  }

  const searchData = async () => {
    setLoading(true);
    const res = await fetchData();
    const regex = new RegExp(keyword.replace(/\s/g, ""), "gi");
    let data = res.filter(
      (list: IName) => regex.test(list.name.replace(/\s/g, "")) === true
    );
    setKeyItems(data);
    setLoading(false);
    setShowData(true);
  };

  // 검색창 키워드 검색
  const onChangeData = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value);
      setIndex(-1);
    },
    [keyword, index]
  );

  // 검색창 및 결과창 영역 외 클릭 감지
  const onCloseData = (e: Event) => {
    if (!closeRef.current?.contains(e.target as Node)) {
      setIndex(-1);
      return setShowData(false);
    }
  };

  // 검색어 작성되어 있는 상태 + 결과창 닫혀있는 상태에서 검색창 다시 클릭 시 검색 결과 보이기
  const onFocusData = useCallback(
    (e: React.FocusEvent) => {
      if (keyword.length) {
        setShowData(true);
      }
    },
    [keyword, showData]
  );

  // 검색 목록에서 클릭했을 때 검색창에 결과 텍스트 변경
  const clickedData = (data: string) => {
    setKeyword(data);
    setShowData(false);
  };

  // 키보드 조작 화면 결과
  const handleKeyArrow = useCallback(
    (e: React.KeyboardEvent) => {
      if (keyword && keyItems.length > 0) {
        switch (e.key) {
          case "ArrowDown":
            setIndex(index + 1);
            if (index + 1 === autoRef.current?.childElementCount) setIndex(0);
            break;
          case "ArrowUp":
            setIndex(index - 1);
            if (index <= 0) {
              setIndex(keyItems.length - 1);
            }
            break;
          case "Escape":
            setKeyItems([]);
            setIndex(-1);
            break;
          case "Enter":
            if (index >= 0) {
              setKeyword(keyItems[index].name);
              setIndex(-1);
              setShowData(false);
            }
            break;
        }
      }
    },
    [keyword, keyItems, index]
  );

  useEffect(() => {
    searchData();
  }, [keyword]);

  useEffect(() => {
    document.addEventListener("click", onCloseData, true);
    return () => {
      document.removeEventListener("click", onCloseData, true);
    };
  });

  return (
    <div>
      <S.InputAreaWrap ref={closeRef}>
        <S.InputArea
          placeholder={placeholder}
          value={keyword}
          onChange={onChangeData}
          onKeyDown={handleKeyArrow}
          onFocus={onFocusData}
        />
        {keyword && loading ? (
          <img src={Spinner} alt="Loading" width="10%" />
        ) : null}
      </S.InputAreaWrap>

      {keyword && (
        <S.AutoDataWrap ref={autoRef} showData={showData}>
          {keyItems.length ? (
            keyItems.map((item, idx) => (
              <S.AutoData
                key={item.name}
                isFocus={idx === index ? true : false}
                onClick={() => clickedData(item.name)}
              >
                <div>
                  <strong>{item.name}</strong> {item.age}
                </div>
                <div>{item.email}</div>
                <div>
                  {item.phone} {item.address}
                </div>
              </S.AutoData>
            ))
          ) : (
            <S.NoData>
              Your search turned up 0 results.
              <br />
              This most likely means the backend is down, yikes!
            </S.NoData>
          )}
        </S.AutoDataWrap>
      )}
    </div>
  );
};

export default InputBox;
