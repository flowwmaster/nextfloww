"use client";

import React, { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

const verify = ({ params }) => {
  const { VerificationProfile, tokenFail } = useUser();

  useEffect(() => {
    if (params?.id) {
      VerificationProfile(params?.id);
    }
  }, [params]);

  return (
    <div className="flex justify-center items-center mt-20 text-xl">
      <div>
        {!tokenFail
          ? "Verification in progress...."
          : "Your verification email is Invalid... Kindly generate a new one"}
      </div>
    </div>
  );
};

export default verify;
