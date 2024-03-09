import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        if (
            req.headers.get("Authorization") !==
            `Bearer ${process.env.CRON_SECRET}`
        ) {
            return Response.json({
                message: "Invalid authorization header"
            }, {
                status: 401
            });
        }

       const deleteUsers = await prisma.invoices.deleteMany({});

    } catch (err) {
        console.error(err);
        return new Response("Internal server error", { status : 500})
    }

	return NextResponse.json({ ok: true });
}
