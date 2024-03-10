import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	try {
		if (
			req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
		) {
			return new NextResponse(
				'Invalid Authorization', {status: 401});
		}

		const deleteInvoiceItems = await prisma.invoiceItem.deleteMany();

		if (deleteInvoiceItems) {
			const deleteInvoices = await prisma.invoice.deleteMany();

			if (deleteInvoices) {
				return new NextResponse("Deleted Successfully", { status: 200 });
			}
		}
	} catch (err) {
		console.error(err);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
