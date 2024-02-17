"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";

type Inputs = z.infer<typeof FormDataSchema>;

export const createInvoice = async (data: Inputs) => {

	// console.log(data.invoiceCode);
	// return;

	if(data.itemLists.length < 0) {
		return { success: false, error: 'Item count must be greater than 0!' }
	} else {
		///insert to database each items
		for (let i = 0; i < Number(data.itemLists.length); i++) {
			await prisma.invoiceItem.create({
				data: {
					invoiceID: data.invoiceCode as string,
					itemName: data.itemLists[i].itemName as string,
					itemQuantity: Number(data.itemLists[i].qty),
					itemPrice: Number(data.itemLists[i].price),
				},
			});
		}

		const newInvoice = await prisma.invoice.create({
			data: {
				invoiceCode: data.invoiceCode as string,
				description: data.description as string,
				status: data.status as string,
				amount: Number(data.itemLists.reduce((accum,item) => accum + item.price, 0)),
				invoiceDate: new Date(data.invoiceDate),
				paymentTerms: data.paymentTerms as string,
				billFromStreetAddress: data.billFromStreetAddress as string,
				billFromCity: data.billFromCity as string,
				billFromPostcode: data.billFromPostcode as string,
				billFromCountry: data.billFromCountry as string,
				clientEmail: data.clientEmail as string,
				clientName: data.clientName as string,
				clientStreetAddress: data.clientStreetAddress as string,
				clientCity: data.clientCity as string,
				clientPostCode: data.clientPostCode as string,
				clientCountry: data.clientCountry as string,
			},
		});

		if(newInvoice) {
			revalidatePath('/');
			return {
				status: "success",
			};
		}
	}
};

export const deleteInvoice = () => {

}
