import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Send the same response even if the user doesn't exist to avoid revealing user information
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "If the email exists, a reset email will be sent.",
        }),
        { status: 200 }
      );
    }

    // Generate a reset token
    const resetToken = bcrypt.hashSync(user.email + Date.now().toString(), 10);

    // Update the user with the reset token and expiration time
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires: new Date(Date.now() + 3600000), // 1-hour expiration
      },
    });

    // Set up the email transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the reset email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`,
    });

    // Return a success message
    return new Response(
      JSON.stringify({
        message: "If the email exists, a reset email will be sent.",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Forgot password error: ", err);

    // Return a 500 error response for any unhandled errors
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
