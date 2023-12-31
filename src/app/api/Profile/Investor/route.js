import Profile from "@/models/Profile";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req) {
  const session = await getServerSession(options);
  if (session && session.user) {
    try {
      const body = await req.json();
      const profileData = body;
      await Profile.create(profileData);
      return NextResponse.json(
        { message: "Invester Profile created!" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Profile creation failed", error },
        { status: 500 }
      );
    }
  } else NextResponse.json({ message: "unauthorized" }, { status: 403 });
}
