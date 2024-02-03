"use client";
import { buttonVariants } from "@/components//ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useChat } from "ai/react";

function mainSection() {
  const [chatData, setChatData] = useState("");
  const [loading, setloading] = useState(false);
  const [question, setQuestion] = useState("");
  const [displayQ, setDisplayQ] = useState("");

  // const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();

  const handleOnInputChange = (data) => {
    setQuestion(data);
  };
  const handleChatSubmit = () => {
    if (question !== "") {
      setQuestion("");
      setDisplayQ(question);
      setloading(true);
      axios
        .post("/api/chat", { prompt: question })
        .then((res) => {
          console.log("res", res);
          if (res?.data) {
            setloading(false);
            setChatData(res.data.chatCompletion.choices[0].message?.content);
          }
        })
        .catch((err) => {
          setloading(false);
          console.log("error", err);
        });
    } else {
      //setError
    }
  };
  return (
    <div className="flex justify-center flex-col items-center home-background">
      {/* <section> */}
      <div className="flex ">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl text-green-600">
          <h1 className="text-4xl font-bold tracking-tight sm:texxt-6xl ">
            Invest
            <span className=" ml-2 mr-2">Smarter,</span>
            Not Harder
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Unlock the full potential of your investment portfolio with our
            cutting-edge aggregation platform.
            <span className="text-blue-600">FIKWIK</span> brings your entire
            investment universe into a single, intuitive dashboard, empowering
            you to make informed decisions with ease.
          </p>
        </div>
        {/* <div className="w-[600px]">
          <img src="/homei.webp" alt="my image" />
        </div> */}
      </div>

      <div className="flex justify-center">
        <Link href="/sell" className={cn(buttonVariants(), "ml-2")}>
          Sell &rarr;
        </Link>
        <Link href="/invest" className={cn(buttonVariants(), "ml-2")}>
          Invest &rarr;
        </Link>
      </div>

      {/* <Card className="w-[400px] mt-20">
        <CardHeader>
          <CardTitle>AI chatbot</CardTitle>
          <CardDescription>Your personal investment copilot.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            {displayQ !== "" && (
              <div className="border border-slate-500 rounded-md p-2 text-right w-c-max-wrp">
                {displayQ}
              </div>
            )}
          </div>

          {loading && (
            <div className="border border-slate-500 rounded-md p-2 mt-4 w-c-max-wrp">
              Thinking...
            </div>
          )}
          <div className="flex justify-end">
            {chatData !== "" ? (
              <div className="flex flex-col gap-4 justify-center items-center mt-10 w-c-max-wrp">
                <div>Your answer</div>
                <div className="max-w-3xl border border-slate-500 rounded-md p-2">
                  {chatData}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-3 justify-center mt-10">
            <Input
              placeholder="Ask your question"
              type="text"
              value={question}
              onChange={(e) => handleOnInputChange(e.target.value)}
            />
            {question !== "" && (
              <Button onClick={() => handleChatSubmit()} className="w-full">
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card> */}
      {/* </section> */}
    </div>
  );
}

export default mainSection;
