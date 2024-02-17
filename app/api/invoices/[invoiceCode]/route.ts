import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

}

export async function DELETE(req: Request) {
    const { invoiceCode } = await req.json();
    try {
        const invoice = await prisma.invoice.delete({
            where: {
                invoiceCode: invoiceCode
            }
        })
        return Response.json({
					message: "Deleted Invoice",
					invoice,
				});
    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err,
        },
        {
            status: 500,
        })
    }
}