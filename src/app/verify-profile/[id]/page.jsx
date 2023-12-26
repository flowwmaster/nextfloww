"use client";

import React, { useEffect } from "react";

const verify = ({ params }) => {
  useEffect(() => {
    if (params) {
      console.log("params", params);
    }
  }, [params]);

  return <div>page</div>;
};

export default verify;
