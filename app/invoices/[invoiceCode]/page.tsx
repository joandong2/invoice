import { prisma } from '@/prisma';
import React from 'react'
import { FaCircle } from 'react-icons/fa';

const getInvoice = async (code: string) => {
	try {
		const invoice = await prisma.invoice.findFirst({
			where: { invoiceCode: code },
			include: {
				invoiceItems: true,
			},
		});

		return invoice
	} catch (error) {
		console.error(error);
		throw error; // Re-throw the error to handle it in the component
	}
};

const Page = async ({ params }: { params: { invoiceCode: string } }) => {

	const invoice = await getInvoice(params.invoiceCode.toUpperCase());
	console.log('component', invoice);

    return (
			<span>
				<span className="flex justify-between">
					<span className="flex">
						<span>Status</span>
						<span
							className={`py-3 px-8 text-[16px] font-bold rounded-md ${invoice?.status} flex items-center justify-items-center gap-3 bg-opacity-[.06]`}
						>
							<FaCircle className="text-[9px]" />{" "}
							<span className="capitalize">{invoice?.status}</span>
						</span>
					</span>
					<span>
						<span>
							<button className="btn text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] border-none">
								Edit
							</button>
						</span>
						<span className="flex gap-4 w-full justify-end">
							<button className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none">
								Delete
							</button>
							<button className="btn text-[16px] text-[#fff] font-bold bg-[#7c5dfa] rounded-[25px] py-4 px-8 border-none">
								Mark as Paid
							</button>
						</span>
					</span>
				</span>
			</span>
		);
};

export default Page
