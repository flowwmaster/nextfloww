import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const POST = async (_req, { params }) => {
  await connect();

  const { id } = params;
  var ObjectId = require("mongodb").ObjectId;
  var o_id = new ObjectId(id);
  const existingUser = await User.findById(id);
  const emailToken = crypto.randomBytes(20).toString("hex");
  const verifyEmailToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");
  const verfyTokenExpires = Date.now() + 900000;

  existingUser.verificationToken = verifyEmailToken;
  existingUser.verificationTokenExpiry = verfyTokenExpires;
  const verifyUrl = `${process.env.NEXTAUTH_URL}verify-profile/${emailToken}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_AUTH_MAIL,
      pass: process.env.NEXT_PUBLIC_AUTH_PASS,
    },
  });

  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: existingUser.email,
    subject: "VERIFY BIZFLOWW ACCOUNT",
    html: `<p>Click on following link to verify your account</p>
                 <p>This link expiers in <b>15 minutes<b></p>
                 <p><a href=${verifyUrl}>Click here</a><b></p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((_res) => {
      return NextResponse.json(
        { message: "Verification email is sent" },
        { status: 200 }
      );
    })
    .catch(async (_err) => {
      existingUser.verificationToken = undefined;
      existingUser.verificationTokenExpiry = undefined;
      await existingUser.save();
      return NextResponse.json(
        { message: "Failed sending reset email. Try again" },
        { status: 400 }
      );
    });

  try {
    await existingUser.save();
    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "User does not exist", err },
      { status: 500 }
    );
  }
};
