import React from "react";

const Loading = () => {
  return (
    <>
      <div className="min-w-[25%] flex flex-col justify-between shadow-md p-4 mb-8">
        <article className="mb-4 animate-pulse ">
          <div className="h-40 bg-gray-300 rounded"></div>
          <div>
            <h2 className="h-8 bg-gray-300 rounded my-2"></h2>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </article>
        <article className="mb-4 animate-pulse ">
          <div className="h-40 bg-gray-300 rounded"></div>
          <div>
            <h2 className="h-8 bg-gray-300 rounded my-2"></h2>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </article>
      </div>

      <div className="min-w-[50%] shadow-md p-4 mb-8">
        <article className="mb-4 animate-pulse">
          <div className="h-60 bg-gray-300 rounded"></div>
          <div>
            <h2 className="h-32 bg-gray-300 rounded my-2"></h2>
            <p className="h-24 bg-gray-300 rounded mb-2"></p>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </article>
      </div>

      {/* <div className="min-w-[25%] p-4 mb-8 shadow-md">
        <div className="animate-pulse mb-4 bg-gray-300 h-[500px] rounded"></div>
      </div> */}
      <div className="min-w-[25%] flex flex-col justify-between shadow-md p-4 mb-8">
        <article className="mb-4 animate-pulse ">
          <div className="h-40 bg-gray-300 rounded"></div>
          <div>
            <h2 className="h-8 bg-gray-300 rounded my-2"></h2>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </article>
        <article className="mb-4 animate-pulse ">
          <div className="h-40 bg-gray-300 rounded"></div>
          <div>
            <h2 className="h-8 bg-gray-300 rounded my-2"></h2>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Loading;
