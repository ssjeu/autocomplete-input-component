import React, { FC, useCallback, useEffect, useState, useRef } from "react";
import * as S from "./styles";
import Spinner from "../../assets/spinner.gif";

interface Props {
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

const InputBox: FC<Props> = ({ placeholder }) => {
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
    return fetch(
        // https://adearth-bucket.s3.ap-northeast-2.amazonaws.com/MOCK_DATA.json
      `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aecf71f2-ef10-4c64-ac79-300586539076/generated.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221027%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221027T142025Z&X-Amz-Expires=86400&X-Amz-Signature=d05bf21291d31e5767a7427561449faa130247114fd963d65bd7f1eaf0e9040c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22generated.json%22&x-id=GetObject`
    )
      .then((res) => res.json())
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

  // 검색창에서 검색어 input
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
    setIndex(-1);
  };

  // 외부 영역 클릭 시 검색 결과창 닫기
  const onCloseData = (event: Event) => {
    if (!closeRef.current?.contains(event.target as Node)) {
      setIndex(-1);
      return setShowData(false);
    }
  };

  // 검색어 작성되어 있는 상태 + 결과창 닫혀있는 상태에서 검색창 다시 클릭 시 검색 결과 보이기
  const onFocusData = (e: React.FocusEvent) => {
    if (keyword.length) {
      setShowData(true);
    }
  };

  // 검색 목록에서 클릭했을 때 검색창에 결과 텍스트 변경
  const clickedData = (data: string) => {
    setKeyword(data);
    setShowData(false);
  };

  // 키보드 조작 화면 결과
  const handleKeyArrow = (e: React.KeyboardEvent) => {
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
  };

  const handleScroll = () => {
    // if (this.scrollLocationRef && this.scrollLocationRef.current) {
    //   this.scrollLocationRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
    console.log("scroll");
    // if (autoRef.current. > 68) {
    //     setScrollY(window.pageYOffset);
    //     setScrollActive(true);
    //   } else {
    //     setScrollY(window.pageYOffset);
    //     setScrollActive(false);
    //   }
  };

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
        <S.AutoDataWrap ref={autoRef} display={showData}>
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
