import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();
  await connect();

  const user = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  user.password = hashPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  try {
    await user.save();
    return NextResponse.json(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid link" }, { status: 400 });
  }
}
