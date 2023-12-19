import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("body", body);
    const userData = body;
    console.log("userData", userData);

    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are requierd" },
        { status: 400 }
      );
    }

    //check for duplicate emails

    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User created" }, { status: 200 });
    //dev note: Check add emails with lowercase mod
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
