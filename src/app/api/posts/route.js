import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, description } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: "POST error", err }, { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    const newPost = await prisma.post.findMany();
    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: "GET error", err }, { status: 500 });
  }
};
