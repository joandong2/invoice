'use client'

import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { createInvoice } from "../../lib/_actions";
import { useForm, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormDataSchema } from "@/lib/schema";
import toast from "react-hot-toast";

type FormValues = z.infer<typeof FormDataSchema>;

const AddInvoice = () => {
	// used this state for the price and quantity real time update
	const [itemsList, setItemsList] = useState<any>([]);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(FormDataSchema),
	});

	const { fields, append, prepend, remove, update, swap, move, insert } =
		useFieldArray({
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: "itemLists", // unique name for your Field Array
		});

	// watch all value
	useEffect(() => {
		const subscription = watch((value) => {
			setItemsList(value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const processEditForm: SubmitHandler<FormValues> = async (data) => {
		const result = await createInvoice(data);
		// console.log("result", result);
		if (result?.status == "success") {
			toast.success("Invoice Created", {});
		}
		reset();
	};

	return (
		<div className="h-full">
			<h1 className="font-bold mb-8 black-text">New Invoice</h1>

			<form
				onSubmit={handleSubmit(processEditForm)}
				className="flex flex-1 flex-col gap-4"
			>
				<input
					type="hidden"
					{...register("invoiceCode")}
					defaultValue={Math.random().toString(36).slice(2, 8).toUpperCase()}
				/>
				<h4 className="text-[#7c5dfa] font-bold mb-2">Bill From</h4>
				<span className="form-control w-full">
					<span className="label-text text-[#7e88c3] font-medium">
						Street Address
					</span>
					<input
						className="input input-bordered w-full"
						{...register("billFromStreetAddress")}
					/>
					{errors.billFromStreetAddress?.message && (
						<p className="text-sm text-red-400 mt-2">
							{errors.billFromStreetAddress.message}
						</p>
					)}
				</span>
				<span className="md:grid md:grid-cols-3 gap-4 mb-12">
					<span className="form-control w-full">
						<span className="label-text text-[#7e88c3] font-medium">City</span>
						<input
							className="input input-bordered w-full"
							{...register("billFromCity")}
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
						Client's Name
					</span>
					<input
						className="input input-bordered w-full"
						{...register("clientName")}
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
							Client's Email
						</span>
						<input
							className="input input-bordered w-full"
							{...register("clientEmail")}
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
					/>
					{errors.clientStreetAddress?.message && (
						<p className="text-sm text-red-400 mt-2">
							{errors.clientStreetAddress.message}
						</p>
					)}
				</span>
				<span className="md:grid md:grid-cols-3 gap-4 mb-4">
					<span className="form-control w-full">
						<span className="label-text text-[#7e88c3] font-medium">City</span>
						<input
							className="input input-bordered w-full"
							{...register("clientCity")}
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
					></textarea>
				</span>
				<h4 className="text-[#7c5dfa] font-bold mb-4">Item List</h4>
				<span className="mb-12 items-list">
					<span className="md:grid md:grid-cols-10">
						<span className="col-span-4 text-[#7e88c3] font-medium">
							Item Name
						</span>
						<span className="col-span-2 text-[#7e88c3] font-medium">Qty.</span>
						<span className="col-span-2 text-[#7e88c3] font-medium">Price</span>
						<span className="col-span-1 text-[#7e88c3] font-medium">Total</span>
						<span className="col-span-1 text-[#7e88c3] font-medium"></span>
					</span>
					<span className="items" id="items">
						{fields.map((field, index) => (
							<span className="md:grid md:grid-cols-10 gap-3 mb-3" key={index}>
								<span className="col-span-4">
									<input
										key={field.id}
										{...register(`itemLists.${index}.itemName`)}
										className="input input-bordered w-full"
									/>
								</span>
								<span className="col-span-2">
									<input
										key={field.id}
										{...register(`itemLists.${index}.itemQuantity`)}
										type="text"
										className="input input-bordered w-full"
									/>
								</span>
								<span className="col-span-2">
									<input
										type="number"
										key={field.id}
										{...register(`itemLists.${index}.itemPrice`)}
										className="input input-bordered w-full"
									/>
								</span>
								<span className="total col-span-1 bold text-[15px] tracking-[.5px] flex flex-col justify-center">
									{itemsList.itemLists && itemsList.itemLists.length > index
										? (
												Number(itemsList.itemLists[index].itemPrice) *
												Number(itemsList.itemLists[index].itemQuantity)
										  ).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
										  })
										: 0}
								</span>
								<span
									onClick={() => remove(index)}
									className="total col-span-1 cursor-pointer flex flex-col justify-center"
								>
									<AiFillDelete className="text-[18px] text-[#888eb0]" />
								</span>
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
				<span className="md:grid md:grid-cols-2">
					<span>
						<button className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] border-none">
							Discard
						</button>
					</span>
					<span className="flex gap-4 w-full justify-end">
						<button
							{...register("status")}
							type="submit"
							name="draft"
							onClick={() => setValue("status", "draft")}
							className="btn text-[16px] text-white font-bold bg-[#373b53] rounded-[25px] py-4 px-8 border-none"
						>
							Save as Draft
						</button>
						<button
							{...register("status")}
							type="submit"
							name="pending"
							onClick={() => setValue("status", "pending")}
							className="btn text-[16px] text-[#fff] font-bold bg-[#7c5dfa] rounded-[25px] py-4 px-8 border-none"
						>
							Save & Send
						</button>
					</span>
				</span>
			</form>
		</div>
	);
};

export default AddInvoice;
