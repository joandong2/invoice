import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { createInvoice } from "../utilities/actionServer";
import { useInvoiceStore } from "../utilities/store";

const SidebarContent = () => {
	const [itemsList, setItemsList] = useState<any>([]);
	const [status, setStatus] = useState<string>("");
	// const stateStatus = useInvoiceStore((state) => state.status)
	const formRef = useRef<HTMLFormElement>(null);

	const handleOnClick = (e: any) => {
		e.preventDefault();
		setItemsList([
			...itemsList,
			{
				itemName: "",
				qty: 0,
				price: 0,
				total: 0,
			},
		]);
	};

	const handleOnChange = (e: any) => {
		// console.log(e.target.name);
		// console.log(e.target.value);
		const split = e.target.name.split(".");

		const newItemsList = itemsList.map((item: any, index: number) => {
			if (Number(split[1]) == index) {
				const udpatedItem = {
					...item,
					[split[0]]: e.target.value,
				};

				return { ...udpatedItem, total: udpatedItem.qty * udpatedItem.price };
			}
			return item;
		});
		setItemsList(newItemsList);
	};

	const handleDelete = (e: number) => {};

	return (
		<div className="h-full">
			<h1 className="font-bold mb-8">New Invoice</h1>
			<form
				ref={formRef}
				action={async (formData) => {
					await createInvoice(formData);
					<div className="toast toast-top toast-end">
						<div className="alert alert-info">
							<span>New mail arrived.</span>
						</div>
						<div className="alert alert-success">
							<span>Message sent successfully.</span>
						</div>
					</div>;
					formRef.current?.reset();
				}}
			>
				<h4 className="text-[#7c5dfa] font-bold mb-4">Bill From</h4>
				<label className="form-control w-full mb-4">
					<div className="label">
						<span className="label-text text-[#7e88c3] font-medium">
							Street Address
						</span>
					</div>
					<input
						type="text"
						name="billFromStreetAddress"
						className="input input-bordered w-full"
					/>
				</label>
				<span className="md:grid md:grid-cols-3 gap-4 mb-12">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								City
							</span>
						</div>
						<input
							type="text"
							name="billFromCity"
							className="input input-bordered w-full"
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								Post Code
							</span>
						</div>
						<input
							type="text"
							name="billFromPostcode"
							className="input input-bordered w-full"
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								Country
							</span>
						</div>
						<input
							type="text"
							name="billFromCountry"
							className="input input-bordered w-full"
						/>
					</label>
				</span>
				<h4 className="text-[#7c5dfa] font-bold mb-4">Bill To</h4>
				<label className="form-control w-full mb-4">
					<div className="label">
						<span className="label-text text-[#7e88c3] font-medium">
							Client's Name
						</span>
					</div>
					<input
						type="text"
						name="clientName"
						className="input input-bordered w-full"
					/>
				</label>
				<label className="form-control w-full mb-4">
					<div className="label">
						<span className="label-text text-[#7e88c3] font-medium">
							Client's Email
						</span>
					</div>
					<input
						type="text"
						name="clientEmail"
						className="input input-bordered w-full"
					/>
				</label>
				<label className="form-control w-full mb-4">
					<div className="label">
						<span className="label-text text-[#7e88c3] font-medium">
							Street Address
						</span>
					</div>
					<input
						type="text"
						name="clientStreetAddress"
						className="input input-bordered w-full"
					/>
				</label>
				<span className="md:grid md:grid-cols-3 gap-4 mb-12">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								City
							</span>
						</div>
						<input
							type="text"
							name="clientCity"
							className="input input-bordered w-full"
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								Post Code
							</span>
						</div>
						<input
							type="text"
							name="clientPostCode"
							className="input input-bordered w-full"
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								Country
							</span>
						</div>
						<input
							type="text"
							name="clientCountry"
							className="input input-bordered w-full"
						/>
					</label>
				</span>
				<span className="md:grid md:grid-cols-2 w-full gap-4">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								Invoice Date
							</span>
						</div>
						<input
							type="date"
							name="invoiceDate"
							className="input input-bordered w-full"
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-[#7e88c3] font-medium">
								Payment Terms
							</span>
						</div>
						<select
							className="select select-bordered w-full"
							name="paymentTerms"
						>
							<option value="30days">Next 30 Days</option>
							<option value="14days">Next 14 Days</option>
						</select>
					</label>
				</span>
				<label className="form-control mb-12">
					<div className="label">
						<span className="label-text text-[#7e88c3] font-medium">
							Project Description
						</span>
					</div>
					<textarea
						className="textarea textarea-bordered h-24"
						name="description"
					></textarea>
				</label>
				<h4 className="text-[#7c5dfa] font-bold mb-4">Item List</h4>
				<span className="mb-12 items-list">
					<span className="md:grid md:grid-cols-9">
						<span className="col-span-3">Item Name</span>
						<span className="col-span-1">Qty.</span>
						<span className="col-span-2">Price</span>
						<span className="col-span-2">Total</span>
						<span className="col-span-1"></span>
					</span>
					<span className="items" id="items">
						{itemsList.length > 0 &&
							[...Array(itemsList.length)].map((_, i: number) => (
								<span className="md:grid md:grid-cols-9 gap-3 mb-3" key={i}>
									<span className="col-span-3">
										<input
											type="hidden"
											name="itemCount"
											value={itemsList.length}
										/>
										<input
											type="text"
											name={`itemName.${i}`}
											onChange={handleOnChange}
											className="input input-bordered w-full"
										/>
									</span>
									<span className="col-span-1">
										<input
											type="number"
											name={`qty.${i}`}
											className="input input-bordered w-full"
											onChange={handleOnChange}
										/>
									</span>
									<span className="col-span-2">
										<input
											type="number"
											name={`price.${i}`}
											className="input input-bordered w-full"
											onChange={handleOnChange}
										/>
									</span>
									<span className="total col-span-2">
										${Number(itemsList[i].total)}
									</span>
									<span className="total col-span-1">
										<AiFillDelete />
									</span>
								</span>
							))}
						<input
							type="hidden"
							name="totalAmount"
							value={itemsList.reduce((a: any, v: any) => (a = a + v.total), 0)}
						/>
						<input
							type="hidden"
							name="invoiceCode"
							value={Math.random().toString(36).slice(2, 8).toUpperCase()}
						/>
						<input type="hidden" name="status" value={status} />
					</span>
				</span>
				<button
					className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] w-full border-none mb-12 py-5 mt-5"
					onClick={handleOnClick}
				>
					+ Add New Item
				</button>
				<span className="md:grid md:grid-cols-2">
					<span>
						<button
							className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] border-none"
							onClick={() => formRef.current?.reset() }
						>
							Discard
						</button>
					</span>
					<span className="flex gap-4 w-full justify-end">
						<button
							onClick={() => setStatus("draft")}
							className="btn text-[16px] text-white font-bold bg-[#373b53] rounded-[25px] py-4 px-8 border-none"
						>
							Save as Draft
						</button>
						<button
							onClick={() => setStatus("pending")}
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

export default SidebarContent;
