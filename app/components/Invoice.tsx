import React, { useEffect } from "react";
import Image from "next/image";
import { FaCircle, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import SidebarContent from "./SidebarContent";
import { prisma } from "@/prisma";
import { Invoice } from "@/lib/types";
import Link from "next/link";

const getInvoices = async () => {
	const invoices = await prisma.invoice.findMany({
		orderBy: {
			invoiceDate: "desc",
		},
		include: {
			invoiceItems: true,
		},
	});

	return invoices;
}

const InvoicePage = async () => {
	const invoices = await getInvoices();

	return (
		<>
			<span className="flex items-center justify-between align-middle mb-[60px]">
				<div>
					<span>
						<h1 className="font-bold">Invoices</h1>
						<p>
							There are {invoices.length ? invoices.length : 0} total invoices
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
								<SidebarContent />
							</ul>
						</span>
					</span>
				</span>
			</span>
			<span>
				{invoices.length > 0
					? invoices.map((invoice: Invoice) => (
							<span className="invoices" key={invoice.invoiceCode}>
								<span className="hidden md:flex w-full justify-evenly items-center gap-10">
									<span className="font-bold text-[22px]">
										#
										<span className="text-[#0c0e16]">
											{invoice.invoiceCode}
										</span>
									</span>
									<span className="date text-[#888eb0]  font-medium">
										{invoice.invoiceDate.toISOString()}
									</span>
									<span className="font-medium text-[#888eb0] mr-[40px]">
										{invoice.clientName}
									</span>
									<span className="font-bold text-[22px] text-[#0c0e16]">{`
								${invoice.amount.toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})}`}</span>
									<span
										className={`py-3 px-8 text-[16px] font-bold rounded-md ${invoice.status} flex items-center justify-items-center gap-3 bg-opacity-[.06]`}
									>
										<FaCircle className="text-[9px]" />{" "}
										<span className="capitalize">{invoice.status}</span>
									</span>
									<span>
										<Link
											href={`/invoices/${invoice.invoiceCode.toLowerCase()}`}
										>
											<IoIosArrowForward className="text-[22px] text-[#7c5dfa] font-bold" />
										</Link>
									</span>
								</span>
							</span>
					  ))
					: "No invoices.."}
			</span>
		</>
	);
};

export default InvoicePage;
