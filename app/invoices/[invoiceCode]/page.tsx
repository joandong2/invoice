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
						<span className="light-blue rounded-[15px] block md:grid md:grid-cols-2 justify-between py-[30px] md:px-[50px] px-[20px] mb-10 w-full">
							<span className="flex align-middle justify-between md:justify-start items-center gap-4 w-full mb-4 md:w-auto md:mb-0">
								<span className="light-grey">Status</span>
								<span
									className={`py-3 px-6 text-[16px] font-bold rounded-md ${invoice.status} flex items-center justify-items-center gap-3 bg-opacity-[.06]`}
								>
									<FaCircle className="text-[9px]" />{" "}
									<span className="capitalize">{invoice.status}</span>
								</span>
							</span>
							<Buttons invoice={invoice} />
						</span>
						<span className="light-blue rounded-[15px] grid md:grid-cols-1 justify-between py-[30px] px-[50px]">
							<span className="flex flex-col md:flex-row md:align-middle justify-between w-full md:items-center gap-4 mb-8">
								<span className="bold ">
									<p className="font-bold text-[20px]">
										#
										<span className="black-text">{`${invoice.invoiceCode}`}</span>
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
							<span className="block md:flex justify-between w-full gap-6 mb-12">
								<span className="bold flex flex-col">
									<span className="mb-6">
										<p className="mb-3 text-[15px]">Invoice Date</p>
										<p className="black-text font-bold text-[20px]">{`${format(
											invoice.invoiceDate,
											"dd LLL yyyy"
										)}`}</p>
									</span>
									<span className="mb-4 md:mb-0">
										<p className="mb-3 text-[15px]">Payment Due</p>
										<span className="black-text font-bold text-[20px]">{`${format(
											invoice.dueDate,
											"dd LLL yyyy"
										)}`}</span>
									</span>
								</span>
								<span className="flex flex-col mb-4 md:mb-0">
									<span className="mb-3 text-[15px]">Bill To</span>
									<span className="black-text font-bold text-[20px] mb-4">
										{invoice.clientName}
									</span>
									<span>{invoice.clientStreetAddress}</span>
									<span>{invoice.clientCity}</span>
									<span>{invoice.clientPostCode}</span>
									<span>{invoice.clientCountry}</span>
								</span>
								<span className="bold flex flex-col">
									<span className="mb-3 text-[15px]">Sent To</span>
									<span className="black-text font-bold text-[20px]">
										{invoice.clientEmail}
									</span>
								</span>
								<span></span>
							</span>
							<span className="blue rounded-t-[15px] grid md:grid-cols-1 justify-between p-5 md:py-[30px] md:px-[50px]">
								<span className="table w-full border-spacing-y-3">
									<span className="md:table-row hidden">
										<span className="table-cell">Item Name</span>
										<span className="table-cell text-right">QTY.</span>
										<span className="table-cell text-right">Price</span>
										<span className="table-cell text-right">Total</span>
									</span>
									{invoice.invoiceItems.length > 0
										? invoice.invoiceItems.map((item: Item, index) => (
												<span className="md:table-row flex gap-6 justify-between w-full mb-2 md:mb-0 md:gap-0" key={index}>
													<span className="table-cell black-text font-bold text-[16px]">
														{item.itemName}
													</span>
													<span className="black-text table-cell text-right font-bold text-[16px]">
														{item.itemQuantity}
													</span>
													<span className="black-text table-cell text-right font-bold text-[16px]">
														{item.itemPrice.toLocaleString("en-US", {
															style: "currency",
															currency: "USD",
														})}
													</span>
													<span className="table-cell text-right black-text font-bold text-[16px]">
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
							<span className="dark-blue text-white rounded-b-[15px] flex w-full md:grid md:grid-cols-1 justify-between py-4 px-6 gap-6 md:py-[50px] md:px-[60px]">
								<span className="flex justify-between gap-5">
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
