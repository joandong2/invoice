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

        const invoiceItems = await prisma.invoiceItem.deleteMany();

        if(invoiceItems) {
            const deleteUsers = await prisma.invoice.deleteMany();

            if(deleteUsers) {
                return new Response('Deleted Successfully', { status: 200})
            }

        }
    } catch (err) {
        console.error(err);
        return new Response("Internal server error", { status : 500})
    }

}
