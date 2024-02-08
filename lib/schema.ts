import { z } from "zod";

export const FormDataSchema = z.object({
	status: z.string(),
	billFromStreetAddress: z.string().nonempty("Field is required."),
	billFromCity: z.string().nonempty("Field is required."),
	billFromPostcode: z.string().nonempty("Field is required."),
	billFromCountry: z.string().nonempty("Field is required."),
	clientName: z.string().nonempty("Field is required."),
	clientEmail: z.string().nonempty("Field is required."),
	clientStreetAddress: z.string().nonempty("Field is required."),
	clientCity: z.string().nonempty("Field is required."),
	clientPostCode: z.string().nonempty("Field is required."),
	clientCountry: z.string().nonempty("Field is required."),
	invoiceCode: z.coerce.string(),
	invoiceDate: z.coerce.date(),
	paymentTerms: z.string(),
	description: z.string(),
	itemLists: z.array(
		z.object({
			itemName: z.string().nonempty("Field is required."),
			qty: z.coerce
				.number({
					required_error: "Field is required",
					invalid_type_error: "Field must be a number",
				})
				.int()
				.positive()
				.min(1, { message: "Field should be at least 1" }),
			price: z.coerce
				.number({
					required_error: "Field is required",
					invalid_type_error: "Field must be a number",
				})
				.int()
				.positive()
				.min(1, { message: "Field should be at least 1" }),
		})
	).nonempty("Items area required."),
});
