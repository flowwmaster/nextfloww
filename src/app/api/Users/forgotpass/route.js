import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";
const nodemailer = require("nodemailer");

export async function POST(req) {
  await connect();

  const { email } = await req.json();

  if (email === undefined) {
    return NextResponse.json(
      { message: "All fields are requierd" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return NextResponse.json(
      { message: "Email not registerd" },
      { status: 400 }
    );
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 900000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `${process.env.NEXTAUTH_URL}reset-password/${resetToken}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_AUTH_MAIL,
      pass: process.env.NEXT_PUBLIC_AUTH_PASS,
    },
  });

  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: "RESET BIZFLOWW PASSWORD",
    html: `<p>Click on following link to reset your password</p>
                 <p>This link expiers in <b>15 minutes<b></p>
                 <p><a href=${resetUrl}>Click here</a><b></p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((_res) => {
      return NextResponse.json(
        { message: "Reset password email is sent" },
        { status: 200 }
      );
    })
    .catch(async (_err) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();
      return NextResponse.json(
        { message: "Failed sending reset email. Try again" },
        { status: 400 }
      );
    });

  try {
    await existingUser.save();
    return NextResponse.json(
      { message: "Reset email is sent" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
