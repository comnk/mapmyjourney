import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ error: "Token and password are required" }),
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters long" }),
        { status: 400 }
      );
    }

    // Debugging: Log the incoming token and password
    console.log("Received token:", token);
    console.log("Finding user with token:", token.trim());

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token.trim(),
        resetTokenExpires: { gte: new Date() }, // Token should not be expired
      },
    });

    // Debugging: Log the user found
    console.log("User found:", user);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // Update the user record: clear the token and set the new password
    await prisma.user.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    console.log(`Password reset successfully for user: ${user.email}`);

    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
