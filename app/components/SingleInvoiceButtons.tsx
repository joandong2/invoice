'use client'

import { Invoice } from '@prisma/client';
import React from 'react'

interface Props {
    invoice: Invoice
}


const SingleInvoiceButtons = (props: Props) => {
	const { invoice } = props;

	const handleOnclick = () => {
		console.log("hello world");
        console.log(props);
	};

	return (
		<>
			<span className="flex gap-4 w-full justify-end">
				<button className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] py-4 px-8 border-none">
					Edit
				</button>
				<button
					className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none"
					onClick={handleOnclick}
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