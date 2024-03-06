'use client'

import { deleteInvoice, paidInvoice } from '@/lib/_actions';
import { Invoice } from '@prisma/client';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useInvoiceStore } from '@/lib/store/store';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EditInvoice from './EditInvoice';

interface InvoiceCode {
	invoiceCode: string
}

const Button = ({ invoice }: { invoice: Invoice }) => {
	const alert = useInvoiceStore((state) => state.alert);
	const toggleAlert = useInvoiceStore((state) => state.toggleAlert);
	const alertState = useInvoiceStore((state) => state.alertState);
	const setAlertState = useInvoiceStore((state) => state.setAlertState);
	const [formSubmit, formSubmitState] = useState<boolean>(false);
	const router = useRouter();

	const { register, handleSubmit } = useForm<InvoiceCode>({
		defaultValues: {
			invoiceCode: invoice.invoiceCode,
		},
	});

	const processForm: SubmitHandler<InvoiceCode> = async (data) => {
		if (formSubmit) {
			console.log(alertState)
			if(alertState == 'delete') {
				const result = await deleteInvoice(data.invoiceCode);
				// if(result?.status === 'error') {
				// 	result.err ? toast.error(result.err) : toast.error("Error!@")
				// 	toggleAlert(false);
				// 	router.refresh();
				// }
				if (result?.status === "success") {
					toast.success("Invoice Deleted", {});
					toggleAlert(false);
					router.refresh();
				}
				formSubmitState(false);
				router.push("/");
			} else {
				const result = await paidInvoice(data.invoiceCode);
				if (result?.status === "success") {
					toast.success("Invoice Updated", {});
				    toggleAlert(false);
				    router.refresh();
				}
				formSubmitState(false);
			}
		};
	};

	return (
		<span className="flex justify-end w-full md:pl-12 gap-2 items-center">
			<span className="drawer z-10 w-auto">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<span className="drawer-content">
					<label
						htmlFor="my-drawer"
						className="btn drawer-button text-[16px] text-[#7e88c3] font-bold bg-[#f9fafe] rounded-[25px] py-4 px-8 border-none"
					>
						Edit
					</label>
				</span>
				<span className="drawer-side">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu w-[80%] md:w-1/2 min-h-full bg-base-200 text-base-content lg:pl-[10em] lg:pr-[60px] pt-[40px] pl-4 pr-4">
						{/* Sidebar content here */}
						<EditInvoice invoice={invoice} />
					</ul>
				</span>
			</span>
			<form
				onSubmit={handleSubmit(processForm)}
				className="flex flex-1 flex-col"
			>
				<input
					type="hidden"
					className="input input-bordered w-full"
					{...register("invoiceCode")}
				/>
				<span className="flex gap-2">
					<button
						className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none"
						onClick={() => {
							setAlertState("delete");
							toggleAlert(true);
						}}
					>
						Delete
					</button>
					<button
						className="btn text-[16px] text-[#fff] font-bold bg-[#7c5dfa] rounded-[25px] py-4 px-8 border-none"
						onClick={() => {
							setAlertState("paid");
							toggleAlert(true);
						}}
					>
						Mark As Paid
					</button>
				</span>
				{alert == true ? (
					<span
						role="alert"
						className="alert absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[450px] bg-white"
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
						<span className="flex gap-1">
							<button
								className="btn text-[16px] font-bold bg-[#f9fafe] rounded-[25px] py-4 px-8 border-none text-[#7e88c3]"
								onClick={() => toggleAlert(false)}
							>
								Cancel
							</button>
							<button
								className="btn text-[16px] text-white font-bold bg-[#ec5757] rounded-[25px] py-4 px-8 border-none"
								onClick={() => {
									formSubmitState(true);
								}}
							>
								Yes
							</button>
						</span>
					</span>
				) : null}
			</form>
		</span>
	);
};

export default Button;