import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  await connect();

  const { name, email, password, verified } = await req.json();

  if (email === undefined || password === undefined) {
    return NextResponse.json(
      { message: "All fields are requierd" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "Email is already in use" },
      { status: 409 }
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashPassword,
    verified: verified ? verified : false,
  });

  try {
    await newUser.save();
    return NextResponse.json({ message: "User is registerd" }, { status: 200 });
    //dev note: Check add emails with lowercase mod
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
