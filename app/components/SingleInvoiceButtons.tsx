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
		</>
	);
};

export default SingleInvoiceButtons