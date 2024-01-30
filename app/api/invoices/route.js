import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const body = await request.json();
		const { description, status, amount, paymentDue, client } = body;

		const newInvoice = await prisma.invoice.create({
			data: {
				description,
				status,
				amount,
				paymentDue,
				client,
			},
		});

		return NextResponse.json(newInvoice);
	} catch (err) {
		return NextResponse.json(
			{ message: "Invoice Error", err },
			{ status: 500 }
		);
	}
};

export const GET = async () => {
	try {
		const invoices = await prisma.invoice.findMany();

		return NextResponse.json(invoices);
	} catch (err) {
		return NextResponse.json(
			{ message: "Invoice Error", err },
			{ status: 500 }
		);
	}
};
