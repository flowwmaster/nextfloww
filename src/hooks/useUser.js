import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useUser() {
  const router = useRouter();
  const [tokenFail, setTokenFail] = useState(false);

  const VerificationProfile = (data) => {
    axios
      .post("/api/Users/verify-profile", JSON.stringify({ token: data }))
      .then((_res) => {
        router.push("/");
      })
      .catch(function (error) {
        console.log("error", error);
        setTokenFail(true);
      });
  };

  return {
    VerificationProfile,
    tokenFail,
  };
}
