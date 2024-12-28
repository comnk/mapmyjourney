import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const email = session.user?.email;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email! },
            include: { travelPreferences: true },
        });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json(user, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error retrieving profile", err }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const email = session.user?.email;
    const body = await req.json();

    const { name, profilePicture, timeZone, currency, travelPreferences } = body;

    try {
        const updatedUser = await prisma.user.update({
          where: { email: email! },
          data: {
            name,
            profilePicture,
            timeZone,
            currency,
            travelPreferences: {
              upsert: {
                create: travelPreferences,
                update: travelPreferences,
              },
            },
          },
        });
    
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating profile", error }, { status: 500 });
    }
}