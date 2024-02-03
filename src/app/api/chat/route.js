import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT_KEY, // This is the default and can be omitted
});

export async function POST(req) {
  //   const session = await getServerSession(options);
  //   if (session && session.user) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    if (!prompt || prompt === "") {
      return NextResponse.json(
        { message: "Please send your prompt" },
        { status: 400 }
      );
    }
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${prompt}` }],
      model: "gpt-4",
    });
    console.log("prompt", prompt);

    // const stream = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "user", content: `${prompt}` }],
    //   stream: true,
    // });

    // let chatCompletion;
    // console.log("stream", stream);
    // // or, equivalently:
    // for await (const chunk of stream) {
    //   // process.stdout.write(chunk.choices[0]?.delta?.content || "");
    //   console.log(
    //     "chunk.choices[0]?.delta?.content",
    //     chunk.choices[0]?.delta?.content
    //   );
    //   chatCompletion = chunk.choices[0]?.delta?.content;
    //   return NextResponse.json({ stream }, { status: 200 });
    // }

    // console.log("aiResult", stream);
    // const chatCompletion = await stream.finalChatCompletion();
    return NextResponse.json({ chatCompletion }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "GET error", error }, { status: 500 });
  }
  //   } else NextResponse.json({ message: "unauthorized" }, { status: 403 });
}
