"use client";

import { deleteInvoice, paidInvoice } from "@/lib/_actions";
import { Invoice } from "@prisma/client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useInvoiceStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface InvoiceCode {
	invoiceCode: string;
}

const PaidButton = ({ invoice }: { invoice: Invoice }) => {
	const alert = useInvoiceStore((state) => state.alert);
	const toggleAlert = useInvoiceStore((state) => state.toggleAlert);
	const [formPaidSubmit, formPaidSubmitState] = useState<boolean>(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
	} = useForm<InvoiceCode>({
		defaultValues: {
			invoiceCode: invoice.invoiceCode,
		},
	});

	const processPaidStatus: SubmitHandler<InvoiceCode> = async (data) => {
		console.log("paid");
		if (formPaidSubmit) {
			// console.log("paid");
			// const result = await paidInvoice(data.invoiceCode);
			// if (result.status === "success") {
			// 	toast.success("Invoice Updated", {});
			//     toggleAlert(false);
			//     router.refresh();
			// }
			//formSubmitState(false);
		}
		toggleAlert(false);

	};

	return (
		<>
			<form
				onSubmit={handleSubmit(processPaidStatus)}
				className="flex flex-1 flex-col gap-4"
			>
				<input
					type="hidden"
					className="input input-bordered w-full"
					{...register("invoiceCode")}
				/>
				<button
					className="btn text-[16px] text-[#fff] font-bold bg-[#7c5dfa] rounded-[25px] py-4 px-8 border-none"
					onClick={() => {
						toggleAlert(true);
					}}
				>
					Mark as Paid
				</button>

				{alert ? (
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
						<span>Mark as Paid?</span>
						<div>
							<button
								className="btn btn-sm mr-3"
								onClick={() => toggleAlert(false)}
							>
								Cancel
							</button>
							<button
								className="btn btn-sm btn-primary"
								onClick={() => {
									formPaidSubmitState(true);
								}}
							>
								Accept
							</button>
						</div>
					</div>
				) : null}
			</form>
		</>
	);
};

export default PaidButton;
