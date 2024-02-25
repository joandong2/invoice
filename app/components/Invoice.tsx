import React, { useEffect } from "react";
import { FaCircle, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { Invoice } from "@/lib/types";
import Link from "next/link";
import AddInvoice from "./AddInvoice";
import { getInvoices } from "@/lib/_actions";
import { format } from "date-fns";

const InvoicePage = async () => {
	const invoices = await getInvoices();

	return (
		<>
			<span className="flex items-center justify-between align-middle mb-[60px]">
				<div>
					<span>
						<h1 className="font-bold">Invoices</h1>
						<p>
							{invoices != undefined
								? `There are ${invoices.length} total invoices`
								: "No invoices."}
						</p>
					</span>
				</div>
				<span className="flex items-center gap-12">
					<span className="text-[15px] font-bold ">
						<span className="dropdown">
							<span tabIndex={0} role="button" className=" m-1">
								Filter by status
							</span>
							<ul
								tabIndex={0}
								className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<a>Draft</a>
								</li>
								<li>
									<a>Pending</a>
								</li>
							</ul>
						</span>
					</span>
					<span className="drawer z-0 w-auto">
						<input id="my-drawer" type="checkbox" className="drawer-toggle" />
						<span className="drawer-content">
							<label
								htmlFor="my-drawer"
								className="btn drawer-button text-[15px] text-white font-bold bg-[#7c5dfa] rounded-[25px] px-3 border-none"
							>
								<span className="bg-white rounded-[50%] p-2 mr-3">
									<FaPlus className=" text-[#7c5dfa] text-[13px]" />
								</span>
								New Invoice
							</label>
						</span>
						<span className="drawer-side">
							<label
								htmlFor="my-drawer"
								aria-label="close sidebar"
								className="drawer-overlay"
							></label>
							<ul className="menu  w-full md:w-1/2 min-h-full bg-base-200 text-base-content lg:pl-[10em] lg:pr-[60px] pt-[40px] pl-4 pr-4">
								{/* Sidebar content here */}
								<AddInvoice />
							</ul>
						</span>
					</span>
				</span>
			</span>
			<span>
				{invoices.length > 0 ? (
					invoices.map((invoice: Invoice, index) => (
						<span className="invoices" key={index}>
							<span className="hidden md:flex w-full justify-evenly items-center gap-15">
								<span className="font-bold flex-1 text-[22px]">
									#<span className="text-[#0c0e16]">{invoice.invoiceCode}</span>
								</span>
								<span className="date flex-1 text-[#888eb0]  font-medium">
									{format(invoice.invoiceDate, "dd LLL yyyy")}
								</span>
								<span className="font-medium flex-1 text-[#888eb0] mr-[40px]">
									{invoice.clientName}
								</span>
								<span></span>
								<span className="font-bold flex-1 text-[22px] text-[#0c0e16]">{`
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
									<Link href={`/invoices/${invoice.invoiceCode.toLowerCase()}`}>
										<IoIosArrowForward className="text-[22px] text-[#7c5dfa] font-bold" />
									</Link>
								</span>
							</span>
						</span>
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
				)}
			</span>
		</>
	);
};

export default InvoicePage;
