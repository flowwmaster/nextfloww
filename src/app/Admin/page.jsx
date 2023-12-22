"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const admin = () => {
  const [bizlist, setBizList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [tab, setTab] = useState("pending");

  const getBizList = async () => {
    axios
      .get("/api/BizList")
      .then((res) => {
        console.log("res", res?.data?.BizListData?.length);
        if (res?.data?.BizListData?.length)
          setBizList([...res?.data?.BizListData]);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getApprovedBizList = async () => {
    axios
      .get("/api/approvedList")
      .then((res) => {
        console.log("res?.datares?.datares?.data", res?.data?.data);
        if (res?.data?.data?.length) setApproveList(res?.data?.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const ApprovedBiz = async (b) => {
    const bizVal = { ...b, verified: true, ebita: 30 };
    axios
      .post(`/api/approvedList`, bizVal)
      .then((res) => {
        console.log("ap", res);
        // if (res?.data?.data?.length) setApproveList(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (tab === "pending") {
      getBizList();
    } else {
      getApprovedBizList();
    }
  }, [tab]);

  return (
    <div className="flex flex-col justify-center items-center  gap-8 mt-20 ">
      <Tabs
        defaultValue="pending"
        className="w-[400px] flex flex-col justify-center items-center"
      >
        <TabsList className="">
          <TabsTrigger onClick={() => setTab("pending")} value="pending">
            Pending
          </TabsTrigger>
          <TabsTrigger onClick={() => setTab("approved")} value="approved">
            Approved
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={"pending"}
          className="mt-10 gap-4 flex flex-col justify-center items-center"
        >
          {bizlist?.length !== 0 &&
            bizlist?.map((b) => (
              <div className="p-5 justify-center border-zinc-100 border-solid border rounded-md w-80">
                <div>
                  <div>{b?.name}</div>
                  <div>{b?.companyName}</div>
                  <div>{b?.number}</div>
                  <div>{b?.email}</div>
                </div>
                <Button
                  className={cn(buttonVariants(), "mt-8")}
                  onClick={() => ApprovedBiz(b)}
                >
                  Approve
                </Button>
              </div>
            ))}
        </TabsContent>
        <TabsContent value="approved">
          {approveList?.length !== 0 &&
            approveList?.map((b) => (
              <div className="p-5 justify-center border-zinc-100 border-solid border rounded-md w-80">
                <div>
                  <div>{b?.name}</div>
                  <div>{b?.companyName}</div>
                  <div>{b?.number}</div>
                  <div>{b?.email}</div>
                  <div>EBITA: {b?.ebita}%</div>
                </div>
                <Button
                  className={cn(buttonVariants(), "mt-8")}
                  onClick={() => ApprovedBiz(b?._id, b)}
                >
                  Approve
                </Button>
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default admin;
