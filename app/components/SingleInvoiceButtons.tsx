'use client'

import { prisma } from '@/prisma';
import { Invoice } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import React, { useState } from 'react'

interface Props {
    invoice: Invoice
}

const SingleInvoiceButtons = (props: Props) => {
	const [alertState, setAlertState] = useState<boolean>(false);
	const { invoice } = props;

	const handleOnClickDelete = async () => {
		const res = await fetch('/api/invoices/')
		setAlertState(false);
		revalidatePath('/')
	};

	return (
		<>
			<span className="flex gap-4 w-full justify-end">
				<button className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] py-4 px-8 border-none">
					Edit
				</button>
				<button
					className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none"
					onClick={()=>setAlertState(true)}
				>
					Delete
				</button>
				{invoice?.status !== "paid" ? (
					<button className="btn text-[16px] text-[#fff] font-bold bg-[#7c5dfa] rounded-[25px] py-4 px-8 border-none">
						Mark as Paid
					</button>
				) : null}
			</span>
			{alertState ? (
				<div
					role="alert"
					className="alert absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[450px]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>Are you sure?</span>
					<div>
						<button className="btn btn-sm mr-3" onClick={()=>setAlertState(false)}>Cancel</button>
						<button className="btn btn-sm btn-primary" onClick={handleOnClickDelete}>Accept</button>
					</div>
				</div>
			) : null}
		</>
	);
};

export default SingleInvoiceButtons