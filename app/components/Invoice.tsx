'use client'

import React, { useEffect, useState } from "react";
import { FaCircle, FaPlus, FaAngleDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { Invoice } from "@/lib/types";
import Link from "next/link";
import AddInvoice from "./AddInvoice";
import { getInvoices } from "@/lib/_actions";
import { format } from "date-fns";

const InvoicePage = ({ invoices }: { invoices  : Invoice[]}) => {
	const [invoicesState, setInvoicesState] = useState<Invoice[] | undefined>();
	const [checkboxes, setCheckboxes] = useState<string[]>([
		"paid",
		"pending",
		"draft",
	]);
	const [isMounted, setIsMounted] = useState<boolean>(true);

	const handleCheckboxChange = (checkboxName: string) => {
		setCheckboxes((prev) => {
			const updatedCheckboxes = [...prev];
			const index = updatedCheckboxes.indexOf(checkboxName);
			if (index !== -1) {
				// remove
				updatedCheckboxes.splice(index, 1);
			} else {
				// insert
				updatedCheckboxes.push(checkboxName);
			}
			return updatedCheckboxes;
		});
	};

	useEffect(() => {
		setIsMounted(false);
		if(isMounted) {
			setInvoicesState(invoices);
			setIsMounted(true);
		}
	}, [invoices, isMounted]);

	useEffect(() => {
		setIsMounted(false);
		const fetchData = async () => {
			const result = await getInvoices(checkboxes);
			setInvoicesState(result);
			//getInvoices can return an object with a status and error property, which may be causing the issue.
			// if (Array.isArray(result)) {
			// 	setInvoicesState(result);
			// } else {
			// 	console.error("Unexpected response format:", result);
			// }
		};
		fetchData();
		setIsMounted(true);
	}, [checkboxes]);


	return (
		<>
			<span className="flex items-center justify-between align-middle mb-[30px] lg:mb-[60px]">
				<div>
					<span>
						<h1 className="font-bold black-text">Invoices</h1>
						<span className="hidden lg:block">
							{invoicesState != undefined
								? `There are ${invoicesState.length} total invoices`
								: "No invoices."}
						</span>
						<span className="block lg:hidden">
							{invoicesState != undefined
								? `${invoicesState.length} invoices`
								: "No invoices."}
						</span>
					</span>
				</div>
				<span className="flex items-center gap-12">
					<span className="text-[15px] font-bold ">
						<span className="dropdown">
							<span
								tabIndex={0}
								role="button"
								className="flex items-center gap-2 m-1 black-text"
							>
								Filter <span className="hidden lg:block">by status</span>{" "}
								<FaAngleDown className="text-[#7c5dfa]" />
							</span>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-box w-36"
							>
								<li>
									<span className="flex">
										<input
											type="checkbox"
											onChange={() => handleCheckboxChange("draft")}
											className="checkbox-xs bg-[#8c71fa]"
											checked={checkboxes.includes("draft")}
										/>
										<span className="label-text">Draft</span>
									</span>
								</li>
								<li>
									<span className="flex">
										<input
											type="checkbox"
											checked={checkboxes.includes("pending")}
											onChange={() => handleCheckboxChange("pending")}
											className="checkbox-xs"
										/>
										<span className="label-text">Pending</span>
									</span>
								</li>
								<li>
									<span className="flex">
										<input
											type="checkbox"
											checked={checkboxes.includes("paid")}
											onChange={() => handleCheckboxChange("paid")}
											className="checkbox-xs"
										/>
										<span className="label-text">Paid</span>
									</span>
								</li>
							</ul>
						</span>
					</span>
					<span className="drawer z-0 w-auto">
						<input id="my-drawer" type="checkbox" className="drawer-toggle" />
						<span className="drawer-content">
							<label
								htmlFor="my-drawer"
								className="btn drawer-button text-[15px] text-white font-bold bg-[#7c5dfa] rounded-[25px] px-3 border-none flex "
							>
								<span className="bg-white rounded-[50%] p-2 mr-3">
									<FaPlus className=" text-[#7c5dfa] text-[13px]" />
								</span>
								<span className="block lg:hidden">New</span>
								<span className="hidden lg:block">New Invoice</span>
							</label>
						</span>
						<span className="drawer-side">
							<label
								htmlFor="my-drawer"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu w-[80%] md:w-1/2 min-h-full bg-base-200 text-base-content lg:pl-[10em] lg:pr-[60px] pt-[40px] pl-4 pr-4 pb-10">
								{/* Sidebar content here */}
								<AddInvoice />
							</ul>
						</span>
					</span>
				</span>
			</span>
			<span>
				{isMounted && invoicesState ? (
					invoicesState.length > 0 ? (
						invoicesState?.map((invoice: Invoice, index) => (
							<Link
								href={`/invoices/${invoice.invoiceCode.toLowerCase()}`}
								key={index}
							>
								<span className="invoices" key={index}>
									<span className="hidden md:flex w-full justify-evenly items-center gap-15">
										<span className="font-bold flex-1 text-[22px]">
											#<span className="black-text">{invoice.invoiceCode}</span>
										</span>
										<span className="date flex-1 text-[#888eb0]  font-medium">
											{format(invoice.invoiceDate, "dd LLL yyyy")}
										</span>
										<span className="font-medium flex-1 light-gray mr-[40px]">
											{invoice.clientName}
										</span>
										<span className="font-bold flex-1 text-[22px] black-text">{`
								${invoice.amount.toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}`}</span>
										<span className={`flex-1`}>
											<span
												className={`w-[80%] my-0 mx-auto py-3 px-4 text-[16px] font-bold rounded-md ${invoice.status} flex items-center justify-center justify-items-center gap-3 bg-opacity-[.06]`}
											>
												<FaCircle className="text-[9px]" />{" "}
												<span className="capitalize">{invoice.status}</span>
											</span>
										</span>
										<span className="">
											{/* <Link
												href={`/invoices/${invoice.invoiceCode.toLowerCase()}`}
											> */}
											<IoIosArrowForward className="text-[22px] text-[#7c5dfa] font-bold" />
											{/* </Link> */}
										</span>
									</span>
									<span className="block md:hidden w-full justify-evenly items-center gap-15">
										<span className="flex flex-1 text-[22px] justify-between mb-6">
											<span className="font-bold black-text">
												#{invoice.invoiceCode}
											</span>
											<span className="text-[16px]">{invoice.clientName}</span>
										</span>
										<span className="date flex-1 text-[#888eb0]  font-medium flex justify-between">
											<span className="flex-col flex">
												<span className="mb-4">
													{format(invoice.invoiceDate, "dd LLL yyyy")}
												</span>
												<span className="font-bold flex-1 text-[22px] black-text">{`
								${invoice.amount.toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}`}</span>
											</span>
											<span>
												<span
													className={`w-[100%] my-0 mx-auto py-3 px-4 text-[16px] font-bold rounded-md ${invoice.status} flex items-center justify-center justify-items-center gap-3 bg-opacity-[.06]`}
												>
													<FaCircle className="text-[9px]" />{" "}
													<span className="capitalize">{invoice.status}</span>
												</span>
											</span>
										</span>
									</span>
								</span>
							</Link>
						))
					) : (
						<span className="flex flex-col align-middle text-center items-center">
							<Image
								src="/assets/illustration-empty.svg"
								width="500"
								height="500"
								alt="Image Best Gear"
								className="mb-10"
							/>
							<h1>There is nothing here</h1>
							<p>
								Create an invoice by clicking{" "}
								<span className="bold">New Invoice</span> button and get started
							</p>
						</span>
					)
				) : (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</span>
		</>
	);
};

export default InvoicePage;
