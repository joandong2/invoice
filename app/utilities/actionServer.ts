"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { useInvoiceStore } from "./store";

export const createInvoice = async (e: FormData) => {
	const itemCount = e.get("itemCount") as string;
	if (Number(e.get("itemCount")) < 0) return;

	const invoiceCode = await prisma.invoice.findUnique({
		where: {
			invoiceCode: e.get("invoiceCode") as string,
		},
	});

	if (invoiceCode) {
		useInvoiceStore.setState({
			status: 'error',
			messages: ["error", "Code is already taken!"],
		});
		return;
	} else {
		const newInvoice = await prisma.invoice.create({
			data: {
				invoiceCode: e.get("invoiceCode") as string,
				description: e.get("description") as string,
				status : e.get("status") as string,
				amount: Number(e.get("totalAmount")),
				invoiceDate: new Date(e.get("invoiceDate") as string),
				paymentTerms: e.get("paymentTerms") as string,
				billFromStreetAddress: e.get("billFromStreetAddress") as string,
				billFromCity: e.get("billFromCity") as string,
				billFromPostcode: e.get("billFromPostcode") as string,
				billFromCountry: e.get("billFromCountry") as string,
				clientEmail: e.get("clientEmail") as string,
				clientName: e.get("clientName") as string,
				clientStreetAddress: e.get("clientStreetAddress") as string,
				clientCity: e.get("clientCity") as string,
				clientPostCode: e.get("clientPostCode") as string,
				clientCountry: e.get("clientCountry") as string,
			},
		});

		//insert to database each items
		for (let i = 0; i < Number(itemCount); i++) {
			// console.log(e.get("itemName." + i));
			// console.log(e.get("qty." + i));
			// console.log(e.get("itemName." + i));
			await prisma.invoiceItem.create({
				data: {
					invoiceID: e.get("invoiceCode") as string,
					itemName: e.get("itemName." + i) as string,
					itemQuantity: Number(e.get("qty." + i)),
					itemPrice: Number(e.get("price." + i)),
				},
			});
		}

		useInvoiceStore.setState({
			status: "success",
			messages: ["success", "Added Successfully!"],
		});
		console.log(useInvoiceStore.getState())
		revalidatePath("/");
	}
};
