"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const admin = () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin");
  //   },
  // });
  return <div>admin</div>;
};

export default admin;
