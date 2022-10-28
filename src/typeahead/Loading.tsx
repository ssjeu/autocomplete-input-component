import React from "react";
import Spinner from "../assets/spinner.gif";

export const Loading = () => {
  return (
    <div>
      <img src={Spinner} alt="Loading" width="10%" />
    </div>
  );
};

export default Loading;
