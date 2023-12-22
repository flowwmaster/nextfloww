import { NextResponse } from "next/server";
import Approved from "@/models/Approved";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const POST = async (req, { params }) => {
  const session = await getServerSession(options);
  if (session && session.user) {
    try {
      const { id } = params;

      const body = await req.json();
      const bizData = body;
      console.log("bizData", bizData);
      await Approved.findByIdAndUpdate(id, bizData, { new: true });
      return NextResponse.json({ message: "GET error" }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "GET error", error },
        { status: 500 }
      );
    }
  } else NextResponse.json({ message: "unauthorized" }, { status: 403 });
};
