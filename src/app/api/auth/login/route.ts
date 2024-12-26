import { compare } from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: {email},
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid email!" }), { status: 401 });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
        return new Response(JSON.stringify({ error: "Incorrect password!" }), { status: 401 });
    }

    return new Response(JSON.stringify({ error: "Login successful!" }), { status: 200 });
}