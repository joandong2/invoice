"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import { addDays } from "date-fns";

type Inputs = z.infer<typeof FormDataSchema>;

export const createInvoice = async (data: Inputs) => {

	if(data.itemLists.length < 0) {
		return { success: false, error: 'Item count must be greater than 0!' }
	} else {
		// insert to database each items
		for (let i = 0; i < Number(data.itemLists.length); i++) {
			await prisma.invoiceItem.create({
				data: {
					invoiceID: data.invoiceCode as string,
					itemName: data.itemLists[i].itemName as string,
					itemQuantity: Number(data.itemLists[i].itemQuantity),
					itemPrice: Number(data.itemLists[i].itemPrice),
				},
			});
		}

		const origDate = new Date(data.invoiceDate);
		const dueDate = addDays(origDate, Number(data.paymentTerms));

		const newInvoice = await prisma.invoice.create({
			data: {
				invoiceCode: data.invoiceCode as string,
				description: data.description as string,
				status: data.status as string,
				amount: Number(
					data.itemLists.reduce(
						(accum, item) => accum + item.itemPrice * item.itemQuantity,
						0
					)
				),
				paymentTerms: data.paymentTerms as string,
				invoiceDate: origDate,
				dueDate: dueDate,
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

export const editInvoice = async (data: Inputs) => {

	//console.log('edit action', data);

	try {
		// Assuming you have a unique identifier for the invoice, let's call it 'invoiceID'
		const invoiceId = data.invoiceCode as string;

		// 1. Update invoice items
		for (let i = 0; i < Number(data.itemLists.length); i++) {

			const itemData = {
				itemName: data.itemLists[i].itemName as string,
				itemQuantity: Number(data.itemLists[i].itemQuantity),
				itemPrice: Number(data.itemLists[i].itemPrice),
			};

			// Assuming you have a unique identifier for the item, let's call it 'itemID'
			const itemID = /* Retrieve item ID based on your data structure or database */;

			// Use an update operation for existing items, or create a new one if necessary
			await prisma.invoiceItem.upsert({
				where: { id: itemID },
				update: itemData,
				create: {  data.invoiceCode, ...itemData },
			});
		}

		// 2. Update the main invoice details
		const origDate = new Date(data.invoiceDate);
		const dueDate = addDays(origDate, Number(data.paymentTerms));

		const invoiceData = {
			invoiceCode: data.invoiceCode as string,
			description: data.description as string,
			status: data.status as string,
			amount: Number(
				data.itemLists.reduce(
				(accum, item) => accum + item.itemPrice * item.itemQuantity,
				0
				)
			),
			paymentTerms: data.paymentTerms as string,
			invoiceDate: origDate,
			dueDate: dueDate,
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
		};

		// Assuming you have a unique identifier for the invoice, let's call it 'invoiceID'
		const invoiceID = data.invoiceCode as string;

		// Use an update operation for existing invoices, or create a new one if necessary
		await prisma.invoice.upsert({
		where: { id: invoiceID },
		update: invoiceData,
		create: { id: invoiceID, ...invoiceData },
		});

		// Assuming you have a function called 'revalidatePath' to trigger revalidation
		revalidatePath("/");

		return {
		status: "success",
		};
	} catch (error) {
		console.error('Error editing invoice:', error);
		return {
		status: "error",
		error: "An error occurred while editing the invoice.",
		};
	}
};


export const paidInvoice = async (data: string) => {
	await prisma.invoice.update({
		where: {
			invoiceCode: data,
		},
		data: {
			status: "paid",
		},
	});

	return {
		status: "success",
		data,
	};
};

export const deleteInvoice = async (data : string) => {

	const invoiceItems = await prisma.invoiceItem.findMany({
		where: {
			invoiceID: data,
		},
	});

	// Delete or update related invoice items
	for (const item of invoiceItems) {
		// Delete related invoice item
		await prisma.invoiceItem.delete({
			where: { id: item.id },
		});
		// Or update related invoice item to remove the reference to the invoice
		// await prisma.invoiceItem.update({
		//   where: { id: item.id },
		//   data: { invoiceId: null },
		// });
	}

	await prisma.invoice.delete({
		where: {
			invoiceCode: data,
		},
	});

	revalidatePath("/");

	return {
		status: "success",
		data,
	};
}

export const getInvoices = async () => {
	const invoices = await prisma.invoice.findMany({
		orderBy: {
			invoiceDate: "desc",
		},
		include: {
			invoiceItems: true,
		},
	});

	return invoices;
};

export const getInvoice = async (code: string) => {
	try {
		const invoice = await prisma.invoice.findFirst({
			where: { invoiceCode: code },
			include: {
				invoiceItems: true,
			},
		});

		return invoice;
	} catch (error) {
		console.error(error);
		throw error; // Re-throw the error to handle it in the component
	}
};
