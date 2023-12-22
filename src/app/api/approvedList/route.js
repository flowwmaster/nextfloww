import Approved from "@/models/Approved";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req) {
  console.log("req", req);
  const session = await getServerSession(options);
  if (session && session.user) {
    try {
      const body = await req.json();
      const bizData = body;
      console.log("bizData", bizData);
      await Approved.create(bizData);
      return NextResponse.json({ message: "GET error" }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "GET error", error },
        { status: 500 }
      );
    }
  } else NextResponse.json({ message: "unauthorized" }, { status: 403 });
}

export const GET = async () => {
  try {
    const data = await Approved.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "GET error", err }, { status: 500 });
  }
};
