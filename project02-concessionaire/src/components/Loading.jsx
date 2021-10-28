import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <div className="w-screen h-screen flex justify-center items-center">
        <ReactLoading
          type="cubes"
          color="#111111"
          height={280}
          width={200}
        />
      </div>
    </div>
  );
};

export default Loading;
