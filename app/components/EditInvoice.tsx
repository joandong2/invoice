"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { createInvoice, editInvoice } from "../../lib/_actions";
import {
	useForm,
	SubmitHandler,
	useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import toast from "react-hot-toast";
import { Invoice } from "@/lib/types";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof FormDataSchema>;

const EditInvoice = ({invoice} : {invoice : Invoice}) => {
	const router = useRouter();
	const [itemsList, setItemsList] = useState<any>();
	const [isMounted, setIsMounted] = useState<boolean>(true);
	const origDate = new Date(invoice.invoiceDate);
	origDate.setDate(origDate.getDate() - 1);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(FormDataSchema),
		defaultValues: {
			itemLists: invoice.invoiceItems || [
				{ itemName: "", itemQuantity: 0, itemPrice: 0 },
			], // Provide default values for the itemLists field array
		},
	});

	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "itemLists", // unique name for your Field Array
	});

	// watch all value
	useEffect(() => {
		setItemsList(invoice);
		setIsMounted(false);

		const subscription = watch((value) => {
			try {
				setItemsList(value);
			} catch (error) {
				console.error("Error updating items list:", error);
			}
		});
		return () => {
			// Unsubscribe from the subscription when the component unmounts
			subscription.unsubscribe();
		};
	}, [watch, setItemsList, setIsMounted, invoice]);

	const processForm: SubmitHandler<FormValues> = async (data) => {
		const result = await editInvoice(data);
		//console.log("result", result);
		if (result?.status == "success") {
			toast.success("Invoice Updated", {});
			router.refresh();
		}
	};

	return (
		<>
			{isMounted ? (
				<span className="loading loading-spinner loading-lg"></span>
			) : (
				<span className="h-full">
					<h1 className="font-bold mb-8">New Invoice</h1>
					<form
						onSubmit={handleSubmit(processForm)}
						className="flex flex-1 flex-col gap-4"
					>
						<input
							type="hidden"
							{...register("invoiceCode")}
							defaultValue={invoice.invoiceCode}
						/>
						<input
							type="hidden"
							{...register("status")}
							defaultValue={invoice.status}
						/>
						<h4 className="text-[#7c5dfa] font-bold mb-2">Bill From</h4>
						<span className="form-control w-full">
							<span className="label-text text-[#7e88c3] font-medium">
								Street Address
							</span>
							<input
								className="input input-bordered w-full"
								{...register("billFromStreetAddress")}
								defaultValue={invoice.billFromStreetAddress}
							/>
							{errors.billFromStreetAddress?.message && (
								<p className="text-sm text-red-400 mt-2">
									{errors.billFromStreetAddress.message}
								</p>
							)}
						</span>
						<span className="md:grid md:grid-cols-3 gap-4 mb-12">
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									City
								</span>
								<input
									className="input input-bordered w-full"
									{...register("billFromCity")}
									defaultValue={invoice.billFromCity}
								/>
								{errors.billFromCity?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.billFromCity.message}
									</p>
								)}
							</span>
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									Post code
								</span>
								<input
									className="input input-bordered w-full"
									{...register("billFromPostcode")}
									defaultValue={invoice.billFromPostcode}
								/>
								{errors.billFromPostcode?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.billFromPostcode.message}
									</p>
								)}
							</span>
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									Country
								</span>
								<input
									className="input input-bordered w-full"
									{...register("billFromCountry")}
									defaultValue={invoice.billFromCountry}
								/>
								{errors.billFromCountry?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.billFromCountry.message}
									</p>
								)}
							</span>
						</span>
						<h4 className="text-[#7c5dfa] font-bold mb-2">Bill To</h4>
						<span className="form-control w-full">
							<span className="label-text text-[#7e88c3] font-medium">
								{`Client's Name`}
							</span>
							<input
								className="input input-bordered w-full"
								{...register("clientName")}
								defaultValue={invoice.clientName}
							/>
							{errors.clientName?.message && (
								<p className="text-sm text-red-400 mt-2">
									{errors.clientName.message}
								</p>
							)}
						</span>
						<span>
							<label className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									{`Client's Email`}
								</span>
								<input
									className="input input-bordered w-full"
									{...register("clientEmail")}
									defaultValue={invoice.clientEmail}
								/>
								{errors.clientEmail?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.clientEmail.message}
									</p>
								)}
							</label>
						</span>
						<span className="form-control w-full">
							<span className="label-text text-[#7e88c3] font-medium">
								Street Address
							</span>
							<input
								className="input input-bordered w-full"
								{...register("clientStreetAddress")}
								defaultValue={invoice.clientStreetAddress}
							/>
							{errors.clientStreetAddress?.message && (
								<p className="text-sm text-red-400 mt-2">
									{errors.clientStreetAddress.message}
								</p>
							)}
						</span>
						<span className="md:grid md:grid-cols-3 gap-4 mb-4">
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									City
								</span>
								<input
									className="input input-bordered w-full"
									{...register("clientCity")}
									defaultValue={invoice.clientCity}
								/>
								{errors.clientCity?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.clientCity.message}
									</p>
								)}
							</span>
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									Post code
								</span>
								<input
									className="input input-bordered w-full"
									{...register("clientPostCode")}
									defaultValue={invoice.clientPostCode}
								/>
								{errors.clientPostCode?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.clientPostCode.message}
									</p>
								)}
							</span>
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									Country
								</span>
								<input
									className="input input-bordered w-full"
									{...register("clientCountry")}
									defaultValue={invoice.clientCountry}
								/>
								{errors.clientCountry?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.clientCountry.message}
									</p>
								)}
							</span>
						</span>
						<span className="md:grid md:grid-cols-2 w-full gap-4">
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									Invoice Date
								</span>
								<input
									type="date"
									className="input input-bordered w-full"
									{...register("invoiceDate")}
									defaultValue={origDate.toISOString().substring(0, 10)}
								/>
								{errors.invoiceDate?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.invoiceDate.message}
									</p>
								)}
							</span>
							<span className="form-control w-full">
								<span className="label-text text-[#7e88c3] font-medium">
									Payment Terms
								</span>
								<select
									className="select select-bordered w-full"
									{...register("paymentTerms")}
									//defaultValue={invoice.paymentTerms}
								>
									<option value="7">Next 7 Days</option>
									<option value="14">Next 14 Days</option>
									<option value="30">Next 30 Days</option>
									<option value="60">Next 60 Days</option>
								</select>
								{errors.paymentTerms?.message && (
									<p className="text-sm text-red-400 mt-2">
										{errors.paymentTerms.message}
									</p>
								)}
							</span>
						</span>
						<span className="flex flex-col w-full">
							<span className="label-text text-[#7e88c3] font-medium">
								Project Description
							</span>
							<textarea
								className="textarea textarea-bordered h-24"
								{...register("description")}
								defaultValue={invoice.description}
							></textarea>
						</span>
						<h4 className="text-[#7c5dfa] font-bold mb-4">Item List</h4>
						<span className="mb-12 items-list">
							<span className="hidden md:grid md:grid-cols-10">
								<span className="col-span-4 text-[#7e88c3] font-medium">
									Item Name
								</span>
								<span className="col-span-2 text-[#7e88c3] font-medium">
									Qty.
								</span>
								<span className="col-span-2 text-[#7e88c3] font-medium">
									Price
								</span>
								<span className="col-span-1 text-[#7e88c3] font-medium">
									Total
								</span>
								<span className="col-span-1 text-[#7e88c3] font-medium"></span>
							</span>
							<span className="items" id="items">
								{fields.map((field, index) => (
									<span
										className="flex flex-wrap md:flex-nowrap  md:grid md:grid-cols-10 gap-3 mb-3"
										key={index}
									>
										<span className="col-span-4 shrink-0 w-[100%]">
											<input
												key={field.id}
												defaultValue={field.itemName}
												{...register(`itemLists.${index}.itemName`)}
												className="input input-bordered w-full"
											/>
										</span>
										<span className="col-span-2">
											<input
												key={field.id}
												defaultValue={field.itemQuantity}
												{...register(`itemLists.${index}.itemQuantity`)}
												type="text"
												className="input input-bordered w-full"
											/>
										</span>
										<span className="col-span-2">
											<input
												type="number"
												defaultValue={field.itemPrice}
												key={field.id}
												{...register(`itemLists.${index}.itemPrice`)}
												className="input input-bordered w-full"
											/>
										</span>
										<span className="hidden total col-span-1 bold text-[15px] tracking-[.5px] md:flex flex-col justify-center">
											{itemsList?.itemLists && itemsList.itemLists.length > 0
												? (
														Number(itemsList.itemLists[index]?.itemPrice) *
														Number(itemsList.itemLists[index]?.itemQuantity)
												  ).toLocaleString("en-US", {
														style: "currency",
														currency: "USD",
												  })
												: (
														Number(itemsList.invoiceItems[index]?.itemPrice) *
														Number(itemsList.invoiceItems[index]?.itemQuantity)
												  ).toLocaleString("en-US", {
														style: "currency",
														currency: "USD",
												  })}
										</span>
										<span
											onClick={() => remove(index)}
											className="total col-span-1 cursor-pointer flex flex-col justify-center"
										>
											<AiFillDelete className="text-[18px] text-[#888eb0]" />
										</span>
										<span className="flex md:hidden h-[1px] w-[96%] bg-[#e1e1e1] m-auto my-4"></span>
									</span>
								))}
							</span>
							<button
								type="button"
								className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] w-full border-none mb-12 py-5 mt-5"
								onClick={() =>
									append({
										itemName: "",
										itemQuantity: 0,
										itemPrice: 0,
									})
								}
							>
								Add New Item
							</button>
						</span>
						<span className="md:grid md:grid-cols-1">
							<span className="flex gap-4 w-full justify-end">
								<button
									type="submit"
									name="draft"
									className="btn text-[16px] text-white font-bold bg-[#373b53] rounded-[25px] py-4 px-8 border-none"
								>
									Cancel
								</button>
								<button
									type="submit"
									name="save"
									className="btn text-[16px] text-[#fff] font-bold bg-[#7c5dfa] rounded-[25px] py-4 px-8 border-none"
								>
									Update
								</button>
							</span>
						</span>
					</form>
				</span>
			)}
		</>
	);
};

export default EditInvoice;
