import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const body = await request.json();
		const { name, email, streetAddress, city, postcode, country } = body;

		const newClient = await prisma.client.create({
			data: {
				name,
				email,
				streetAddress,
				city,
				postcode,
				country,
			},
		});

		return NextResponse.json(newClient);
	} catch (err) {
		return NextResponse.json({ message: "Post Error", err }, { status: 500 });
	}
};

export const GET = async () => {
	try {
		const clients = await prisma.client.findMany();

		return NextResponse.json(clients);
	} catch (err) {
		return NextResponse.json({ message: "Post Error", err }, { status: 500 });
	}
};
