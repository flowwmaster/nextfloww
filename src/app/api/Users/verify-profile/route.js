import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";

export async function POST(req) {
  const { token } = await req.json();
  await connect();

  const hashedtoken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    verificationToken: hashedtoken,
    verificationTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return NextResponse.json({ message: "Invalid link" }, { status: 400 });
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  try {
    await user.save();
    return NextResponse.json({ message: "User verified" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid link" }, { status: 400 });
  }
}
