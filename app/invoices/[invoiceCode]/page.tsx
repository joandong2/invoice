import { prisma } from '@/prisma';
import React from 'react'
import { FaCircle } from 'react-icons/fa';
import { format } from "date-fns";
import { Item } from '@/lib/types';
import Link from 'next/link';
import { getInvoice } from '@/lib/_actions';
import Buttons from '@/app/components/Buttons';


const Page = async ({ params }: { params: { invoiceCode: string } }) => {

	const invoice = await getInvoice(params.invoiceCode.toUpperCase());

    return (
			<>
				{invoice !== null ? (
					<span>
						<span className="bg-[#fff] rounded-[15px] grid md:grid-cols-2 justify-between py-[30px] px-[50px] mb-10">
							<span className="flex align-middle items-center gap-4">
								<span>Status</span>
								<span
									className={`py-3 px-6 text-[16px] font-bold rounded-md ${invoice.status} flex items-center justify-items-center gap-3 bg-opacity-[.06]`}
								>
									<FaCircle className="text-[9px]" />{" "}
									<span className="capitalize">{invoice.status}</span>
								</span>
							</span>
							<Buttons invoice={invoice} />
						</span>
						<span className="bg-[#fff] rounded-[15px] grid md:grid-cols-1 justify-between py-[30px] px-[50px]">
							<span className="flex align-middle justify-between w-full items-center gap-4 mb-8">
								<span className="bold ">
									<p className="font-bold text-[20px]">
										#
										<span className="text-black">{`${invoice.invoiceCode}`}</span>
									</p>
									<p>{invoice.description}</p>
								</span>
								<span>
									<p>{invoice.billFromStreetAddress}</p>
									<p>{invoice.billFromCity}</p>
									<p>{invoice.billFromPostcode}</p>
									<p>{invoice.billFromCountry}</p>
								</span>
							</span>
							<span className="flex justify-between w-full gap-6 mb-12">
								<span className="bold flex flex-col">
									<span className="mb-6">
										<p className="mb-3 text-[15px]">Invoice Date</p>
										<p className="text-black font-bold text-[20px]">{`${format(
											invoice.invoiceDate,
											"dd LLL yyyy"
										)}`}</p>
									</span>
									<span>
										<p className="mb-3 text-[15px]">Payment Due</p>
										<span className="text-black font-bold text-[20px]">{`${format(
											invoice.dueDate,
											"dd LLL yyyy"
										)}`}</span>
									</span>
								</span>
								<span className="flex flex-col">
									<span className="mb-3 text-[15px]">Bill To</span>
									<span className="text-black font-bold text-[20px] mb-4">
										{invoice.clientName}
									</span>
									<span>{invoice.clientStreetAddress}</span>
									<span>{invoice.clientCity}</span>
									<span>{invoice.clientPostCode}</span>
									<span>{invoice.clientCountry}</span>
								</span>
								<span className="bold flex flex-col">
									<span className="mb-3 text-[15px]">Sent To</span>
									<span className="text-black font-bold text-[20px]">
										{invoice.clientEmail}
									</span>
								</span>
								<span></span>
							</span>
							<span className="bg-[#f9fafe] rounded-t-[15px] grid md:grid-cols-1 justify-between py-[30px] px-[50px]">
								<span className="table w-full border-spacing-y-3">
									<span className="table-row">
										<span className="table-cell">Item Name</span>
										<span className="table-cell text-right">QTY.</span>
										<span className="table-cell text-right">Price</span>
										<span className="table-cell text-right">Total</span>
									</span>
									{invoice.invoiceItems.length > 0
										? invoice.invoiceItems.map((item: Item, index) => (
												<span className="table-row" key={index}>
													<span className="table-cell text-black font-bold text-[16px]">
														{item.itemName}
													</span>
													<span className="table-cell text-right font-bold text-[16px]">
														{item.itemQuantity}
													</span>
													<span className="table-cell text-right font-bold text-[16px]">
														{item.itemPrice.toLocaleString("en-US", {
															style: "currency",
															currency: "USD",
														})}
													</span>
													<span className="table-cell text-right text-black font-bold text-[16px]">
														{(
															item.itemQuantity * item.itemPrice
														).toLocaleString("en-US", {
															style: "currency",
															currency: "USD",
														})}
													</span>
												</span>
										  ))
										: "No items for this order"}
								</span>
							</span>
							<span className="bg-[#373b53] text-white rounded-b-[15px] grid md:grid-cols-1 justify-between py-[50px] px-[60px]">
								<span className="flex justify-between">
									<span>Amount Due</span>
									<span className="text-[32px]">
										{invoice.amount.toLocaleString("en-US", {
											style: "currency",
											currency: "USD",
										})}
									</span>
								</span>
							</span>
						</span>
					</span>
				) : (
					<>
						<span>
							"There is an error with this invoice!"{" "}
							<Link href="/" className="text-red ml-4">
								Homepage
							</Link>
						</span>
					</>
				)}
			</>
		);
};

export default Page
