import React from "react";

const page = ({ searchParams }) => {
  const userIDd = searchParams.id;
  return <div>userID: {userIDd}</div>;
};

export default page;
