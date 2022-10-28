import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import styled from "styled-components";
import Loading from "./Loading";

interface Props {
  keyword: string;
  clickedData: any;
  arrowIndex: number;
  arrowData: any;
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

const AutoComplete: FC<PropsWithChildren<Props>> = ({
  keyword,
  clickedData,
  arrowIndex,
  arrowData
}) => {
  const [keyItems, setKeyItems] = useState<autoDatas[]>([]);
  const [loading, setLoading] = useState(true);

  const autoRef = useRef<HTMLDivElement>(null);
  console.log(autoRef);

  const fetchData = () => {
    return fetch(
      `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aecf71f2-ef10-4c64-ac79-300586539076/generated.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221027%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221027T142025Z&X-Amz-Expires=86400&X-Amz-Signature=d05bf21291d31e5767a7427561449faa130247114fd963d65bd7f1eaf0e9040c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22generated.json%22&x-id=GetObject`
    )
      .then((res) => res.json())
      .then((data) => data.slice(0, 100));
  };

  interface IName {
    includes(data: string): boolean;
    name?: any;
  }

  const searchData = async () => {
    setLoading(true);
    const res = await fetchData();
    let data = res.filter(
      (list: IName) => list.name.includes(keyword) === true
    );
    //   .slice(0, 10);
    setKeyItems(data);
    setLoading(false);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) searchData();
    }, 400);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]); //키워드가 변경되면 api를 호출
  if(keyItems.length > 0){
    console.log(arrowIndex);
}

//   useEffect(() => {
    // if (keyItems.length > 0) {
    //   switch (keyArrowAction) {
    //     case "ArrowDown":
    //       setIndex(index + 1);
    //       console.log(keyArrowAction, index);
    //       if (autoRef.current?.childElementCount === index + 1) setIndex(0);
    //       break;
    //     case "ArrowUp":
    //       setIndex(index - 1);
    //       console.log(keyArrowAction, index);
    //       if (index <= 0) {
    //         setIndex(keyItems.length - 1);
    //         console.log(keyArrowAction, index);
    //       }
    //       break;
    //     case "Escape":
    //       setKeyItems([]);
    //       setIndex(-1);
    //       console.log(keyArrowAction, index);
    //       clickedData("");
    //       break;
    //   }
    // }
//     if(keyItems.length > 0){
//         console.log(arrowIndex);
//     }
//   }, [arrowIndex]);

  return (
    <AutoDataWrap ref={autoRef}>
      {loading ? (
        <Loading />
      ) : keyItems && keyItems.length ? (
        keyItems.map((search, idx) => (
          <AutoData
            key={search.name}
            onClick={() => {
              clickedData(search.name);
            }}
            // isFocus={index === idx ? true : false}
          >
            <div>
              <strong>{search.name}</strong> {search.age}
            </div>
            <div>{search.email}</div>
            <div>
              {search.phone} {search.address}
            </div>
          </AutoData>
        ))
      ) : (
        <NoData>
          Your search turned up 0 results.
          <br />
          This most likely means the backend is down, yikes!
        </NoData>
      )}
    </AutoDataWrap>
  );
};

const AutoDataWrap = styled.div`
  z-index: 3;
  min-height: 100px;
  max-height: 620px;
  width: 800px;
  border-radius: 20px;
  background-color: white;
  position: absolute;
  top: 340px;
  padding: 0 48px;
  border: 2px solid black;
  overflow: auto;
  color: black;
`;

const AutoData = styled.div<{ isFocus?: boolean }>`
  padding: 20px 0;
  text-align: left;
  border-bottom: 1px solid;
  background-color:${(props) => (props.isFocus ? "#edf5f5" : "#fff")}

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

const NoData = styled.div`
  font-size: 24px;
  padding: 20px 0;
`;

export default AutoComplete;
