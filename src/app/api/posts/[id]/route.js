import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const GET = async (request, { params }) => {
  const session = await getServerSession(options);

  if (session && session.user) {
    try {
      const { id } = params;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        return NextResponse.json(
          { message: "Post not found", err },
          { status: "404" }
        );
      }
      return NextResponse.json(post);
    } catch (err) {
      return NextResponse.json({ message: "GET error", err }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "unauth" }, { status: 403 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const body = await request.json();
    const { title, description } = body;
    const { id } = params;

    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    if (!updatePost) {
      return NextResponse.json(
        { message: "Post not found", err },
        { status: "404" }
      );
    }

    return NextResponse.json(updatePost);
  } catch (err) {
    return NextResponse.json({ message: "UPDATE error", err }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Post has been deleted");
  } catch (err) {
    return NextResponse.json({ message: "DELETE error", err }, { status: 500 });
  }
};
